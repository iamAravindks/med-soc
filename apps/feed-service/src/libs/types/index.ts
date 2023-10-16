import { CacheContext } from "@hubspire/cache-directive";
import { GraphQLSchema } from "graphql";
import HelloDataSource from "../../modules/hello/hello.datasource";
import LikeDataSource from "../../modules/like/like.datasource";
import PostDataSource from "../../modules/post/post.datasource";
import { getLoaders } from "../config";
export * from "./generated/base-types";

export interface FeedServiceContext {
  accessToken?: string;
  isMHAdmin: boolean;
  dataSources: TDataSourceContext;
  cacheContext: CacheContext;
  loaders: ReturnType<typeof getLoaders>;
  userId?: string;
}

export type TDataSourceContext = {
  helloDataSource: HelloDataSource;
  postDataSource: PostDataSource;
  likeDataSource: LikeDataSource;
};

export type TModule = {
  schemas: GraphQLSchema;
  dataSources: TDataSourceContext;
};
