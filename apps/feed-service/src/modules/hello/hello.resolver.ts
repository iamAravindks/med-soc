import { Resolvers } from "../../libs/types";

export default {
  Query: {
    feedServiceHello: (parent, args, context, info) =>
      context.dataSources.helloDataSource.sayHello(),
  },
} as Resolvers;
