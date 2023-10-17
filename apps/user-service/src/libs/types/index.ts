import { CacheContext } from "@hubspire/cache-directive";
import { GraphQLSchema } from "graphql";
import AuthDataSource from "../../modules/auth/auth.datasource";
import UserDataSource from "../../modules/user/user.datasource";
import { getLoaders } from "../config";
export * from "./generated/base-types";

export interface UserServiceContext {
  accessToken?: string;
  isMHAdmin: boolean;
  refreshToken?: string;
  dataSources: TDataSourceContext;
  cacheContext: CacheContext;
  loaders: ReturnType<typeof getLoaders>;
  userId?: string;
}

export type TDataSourceContext = {
  userDataSource: UserDataSource;
  authDataSource: AuthDataSource;
};

export type TModule = {
  schemas: GraphQLSchema;
  dataSources: TDataSourceContext;
};
