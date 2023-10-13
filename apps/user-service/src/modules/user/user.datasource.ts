import { getSearchRegex, parseQuery } from "@hubspire/cache-directive";
import { AccessMode, appMainSDK } from "@med-soc/codegen-sdk";
import { GraphQLError } from "graphql";
import { get, omit, set, size } from "lodash";
import mongoose, { PipelineStage } from "mongoose";
import {
  CreateUserInput,
  QueryGetAllUserArgs,
  QueryGetAllUserCountArgs,
  QueryGetOneUserArgs,
  UpdateUserInput,
  UserServiceContext,
} from "../../libs/types";
import { getUserFromToken } from "../../utils/Helper";
import { UserModel } from "./user.model";

export default class UserDataSource {
  private readonly model = UserModel;

  async getAllUser(args: QueryGetAllUserArgs) {
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
    pipelines.push(
      {
        $match: parseQuery(args.filter),
      },
      {
        $project: { password: 0, passwordToken: 0, passwordTokenExpires: 0 },
      }
    );
    size(args.search?.trim()) <= 2 &&
      pipelines.push({ $sort: args.sort || { createdAt: -1 } });
    pipelines.push({ $skip: offset });
    pipelines.push({ $limit: limit });

    return this.model.aggregate(pipelines);
  }

  async getAllUserCount(args: QueryGetAllUserCountArgs) {
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

  async getUserById(_id: string) {
    return this.model.findById(_id).lean();
  }

  async getOneUser(args: QueryGetOneUserArgs) {
    return this.model.findOne(args.filter).sort(args.sort).lean();
  }

  async createUser(data: CreateUserInput) {
    const user = new this.model({ ...data });
    return user.save();
  }

  async updateUser(data: UpdateUserInput) {
    const user = await this.model.findById(data._id);
    if (!user) throw new GraphQLError("user not found");

    for (const field in omit(data, "_id")) set(user, field, get(data, field));

    return user.save();
  }

  async deleteUser(_id: string) {
    const user = await this.model.findById(_id);
    if (!user) throw new GraphQLError("user not found");

    await this.model.deleteOne({ _id });
    return user;
  }

  async getCurrentUser(token: string) {
    const userId = await getUserFromToken(token?.replace("Bearer ", ""));
    const user = await this.model
      .findById(new mongoose.Types.ObjectId(userId))
      .select("-password -passwordResetToken -passwordResetTokenExpires");
    return user;
  }

  async getProfile(args: any, context: UserServiceContext) {
    const userId = context.userId;

    const user = await this.model
      .findById(new mongoose.Types.ObjectId(userId))
      .select("-password -passwordResetToken -passwordResetTokenExpires");
    return user;
  }

  async getPostsByUser(args: any, context: UserServiceContext) {
    const { sdk } = appMainSDK(AccessMode.User, context.accessToken as string);
    const variables: any = {};

    if (args?.limit) {
      variables.limit = args.limit;
    } else {
      variables.limit = 5;
    }

    if (args?.offset) {
      variables.offset = args.offset;
    }

    if (args?.sort) {
      variables.search = args.sort;
    }

    if (args?.filter) {
      variables.filter = args.filter;
    }
    console.log(variables);
    const posts = await sdk.GetAllPost(variables);
    console.log(posts);
    return posts.getAllPost;
  }
}
