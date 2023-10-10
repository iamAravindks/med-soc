import { CacheContext } from "@hubspire/cache-directive";
import { GraphQLSchema } from "graphql";
import HelloDataSource from "../../modules/hello/hello.datasource";
import UserDataSource from "../../modules/user/user.datasource";
import { getLoaders } from "../config";
export * from "./generated/base-types";

export interface UserServiceContext {
  accessToken?: string;
  isMHAdmin: boolean;
  dataSources: TDataSourceContext;
  cacheContext: CacheContext;
  loaders: ReturnType<typeof getLoaders>;
}

export type TDataSourceContext = {
  helloDataSource: HelloDataSource;
  userDataSource: UserDataSource;
};

export type TModule = {
  schemas: GraphQLSchema;
  dataSources: TDataSourceContext;
};
