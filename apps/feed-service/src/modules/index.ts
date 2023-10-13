import { buildSubgraphSchema } from "@apollo/subgraph";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { cacheDirectiveTransformer } from "@hubspire/cache-directive";
import { authDirectiveTransformer } from "@med-soc/shared-backend";
import {
  GraphQLDateTime,
  GraphQLEmailAddress,
  GraphQLJSON,
} from "graphql-scalars";
import path from "path";
import { TModule } from "../libs/types";
import HelloDataSource from "./hello/hello.datasource";
import PostDataSource from "./post/post.datasource";

const typeDefs = mergeTypeDefs(
  loadFilesSync(path.resolve(__dirname + "/**/*.graphql"), {
    extensions: ["graphql"],
  })
);
const resolvers = mergeResolvers(
  loadFilesSync(path.resolve(__dirname + "/**/*.resolver.{ts,js}"), {
    extensions: ["ts", "js"],
  })
);

export const Modules: TModule = {
  dataSources: {
    helloDataSource: new HelloDataSource(),
    postDataSource: new PostDataSource(),
  },
  schemas: cacheDirectiveTransformer(
    authDirectiveTransformer(
      buildSubgraphSchema({
        typeDefs: typeDefs,
        resolvers: {
          ...resolvers,
          ...{ JSON: GraphQLJSON },
          ...{ DateTime: GraphQLDateTime },
          ...{ EmailAddress: GraphQLEmailAddress },
        },
      })
    )
  ),
};
