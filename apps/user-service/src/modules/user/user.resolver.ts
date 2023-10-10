import { Resolvers } from "../../libs/types";

export default {
  Query: {
    getUserById: (parent, args, context, info) =>
      context.dataSources.userDataSource.getUserById(String(args._id)),
    getAllUser: (parent, args, context, info) =>
      context.dataSources.userDataSource.getAllUser(args),
    getOneUser: (parent, args, context, info) =>
      context.dataSources.userDataSource.getOneUser(args),
    getAllUserCount: (parent, args, context, info) =>
      context.dataSources.userDataSource.getAllUserCount(args),
  },
  Mutation: {
    createUser: (parent, args, context, info) =>
      context.dataSources.userDataSource.createUser(args.data),

    updateUser: (parent, args, context, info) =>
      context.dataSources.userDataSource.updateUser(args.data),

    deleteUser: (parent, args, context, info) =>
      context.dataSources.userDataSource.deleteUser(String(args._id)),
  },
  User: {
    __resolveReference: async (ref, context, info) =>
      ref._id ? context.loaders.userByIdLoader.load(ref._id) : null,
  },
} as Resolvers;
