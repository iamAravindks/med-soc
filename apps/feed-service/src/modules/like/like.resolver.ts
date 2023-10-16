import { CreateLikeInput, Resolvers } from "../../libs/types";

export default {
  Query: {
    getAllLike: (parent, args, context, info) =>
      context.dataSources.likeDataSource.getAllLike(args),
    getOneLike: (parent, args, context, info) =>
      context.dataSources.likeDataSource.getOneLike(args),
    getAllLikeCount: (parent, args, context, info) =>
      context.dataSources.likeDataSource.getAllLikeCount(args),
  },
  Mutation: {
    createLike: (parent, args, context, info) =>
      context.dataSources.likeDataSource.createLike(args.data),
    deleteLike: (parent, args, context, info) =>
      context.dataSources.likeDataSource.deleteLike(
        args as unknown as CreateLikeInput
      ),
  },
  Like: {
    __resolveReference: async (ref, context, info) =>
      ref._id ? context.loaders.likeByIdLoader.load(ref._id) : null,
  },
} as Resolvers;
