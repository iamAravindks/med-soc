import { CacheService } from "@hubspire/cache-directive";
import { getLoaders } from "../libs/config";
import { UserServiceContext } from "../libs/types";
import { Modules } from "../modules";

export enum ContextValueType {
  mhToken = "MH_TOKEN",
  authenticated = "AUTHENTICATED",
  unAuthenticated = "UNAUTHENTICATED",
  userId = "USER_ID",
}

export const MockContextValue = (
  type: ContextValueType,
  cache: CacheService,
  accessToken?: string,
  userId?: string
): UserServiceContext => {
  switch (type) {
    case ContextValueType.mhToken:
      return {
        isMHAdmin: true,
        accessToken: undefined,
        cacheContext: { cache, sessionId: null },
        dataSources: Modules.dataSources,
        loaders: getLoaders(),
      };
    case ContextValueType.authenticated:
      return {
        isMHAdmin: false,
        accessToken,
        cacheContext: { cache, sessionId: accessToken! },
        dataSources: Modules.dataSources,
        loaders: getLoaders(),
      };
    case ContextValueType.userId:
      return {
        isMHAdmin: true,
        accessToken,
        userId,
        cacheContext: { cache, sessionId: accessToken! },
        dataSources: Modules.dataSources,
        loaders: getLoaders(),
      };
    default:
      return {
        isMHAdmin: false,
        accessToken: undefined,
        cacheContext: { cache, sessionId: null },
        dataSources: Modules.dataSources,
        loaders: getLoaders(),
      };
  }
};
