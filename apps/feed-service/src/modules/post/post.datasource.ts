import { getSearchRegex, parseQuery } from "@hubspire/cache-directive";
import { AccessMode, appMainSDK } from "@med-soc/codegen-sdk";
import { GraphQLError } from "graphql";
import { get, omit, set, size } from "lodash";
import { PipelineStage } from "mongoose";
import {
  CreatePostInput,
  FeedServiceContext,
  QueryGetAllPostArgs,
  QueryGetAllPostCountArgs,
  QueryGetOnePostArgs,
  UpdatePostInput,
} from "../../libs/types";
import { PostModel } from "./post.model";

export default class PostDataSource {
  private readonly model = PostModel;

  async getAllPost(args: QueryGetAllPostArgs) {
    const pipelines: PipelineStage[] = [];
    const limit = Number(args.limit) || 10;
    const offset = Number(args.offset) || 0;

    if (size(args.search?.trim()) > 2) {
      pipelines.push({
        $search: {
          index: "search-index-name",
          regex: {
            path: ["field-name"],
            query: getSearchRegex(args.search?.trim() || ""),
            allowAnalyzedField: true,
          },
        },
      });
    }
    pipelines.push({
      $match: parseQuery(args.filter),
    });
    size(args.search?.trim()) <= 2 &&
      pipelines.push({ $sort: args.sort || { createdAt: -1 } });
    pipelines.push({ $skip: offset });
    pipelines.push({ $limit: limit });

    return this.model.aggregate(pipelines);
  }

  async getAllPostCount(args: QueryGetAllPostCountArgs) {
    const pipelines: PipelineStage[] = [];

    if (size(args.search?.trim()) > 2) {
      pipelines.push({
        $search: {
          index: "search-index-name",
          regex: {
            path: ["field-name"],
            query: getSearchRegex(args.search?.trim() || ""),
            allowAnalyzedField: true,
          },
        },
      });
    }
    pipelines.push({
      $match: parseQuery(args.filter),
    });
    pipelines.push({ $count: "totalCount" });

    return (await this.model.aggregate(pipelines))[0]?.totalCount || 0;
  }

  async getPostById(_id: string) {
    return this.model.findById(_id).lean();
  }

  async getOnePost(args: QueryGetOnePostArgs) {
    return this.model.findOne(args.filter).sort(args.sort).lean();
  }

  async createPost(data: CreatePostInput) {
    const post = new this.model({ ...data });
    return post.save();
  }

  async updatePost(data: UpdatePostInput) {
    const post = await this.model.findById(data._id);
    if (!post) throw new GraphQLError("post not found");

    for (const field in omit(data, "_id")) set(post, field, get(data, field));

    return post.save();
  }

  async deletePost(_id: string) {
    const post = await this.model.findById(_id);
    if (!post) throw new GraphQLError("post not found");

    await this.model.deleteOne({ _id });
    return post;
  }

  async getAuthor(args: any, context: FeedServiceContext) {
    const { sdk } = appMainSDK(AccessMode.User, context.accessToken as string);
    const variables = { id: args._id };
    const author = await sdk.GetUserById(variables);
    return author?.getUserById;
  }
}
