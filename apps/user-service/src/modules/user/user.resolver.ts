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
    current_user: (parent, args, context, info) =>
      context.dataSources.userDataSource.getCurrentUser(
        context.accessToken as string
      ),
    getProfile: (parent, args, context, info) => {
      return context.dataSources.userDataSource.getProfile(args, context);
    },
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
    posts: async (parent, args, context, info) => {
      if (!args.filter) {
        args.filter = { creator: parent._id };
      } else {
        args.filter = { ...args.filter, creator: parent._id };
      }
      console.log(args);
      const posts = await context.dataSources.userDataSource.getPostsByUser(
        args,
        context
      );
      console.log(posts);
      return posts as any;
    },
    // posts: async (parent) =>
    //   ({
    //     _typename: "Post",
    //     creator: parent._id ? parent._id.toString() : null,
    //   }) as any,
  },
} as Resolvers;
