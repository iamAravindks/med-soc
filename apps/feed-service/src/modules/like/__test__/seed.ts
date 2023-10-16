import mongoose, { Types } from "mongoose";

export const rawLikeData = [
  {
    _id: new Types.ObjectId("652cc0836aac8a68e5d20d5d"),
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: [new Types.ObjectId("652cc0836aac8a68e5d20d5e")],
    postId: [new Types.ObjectId("652cc0836aac8a68e5d20d5f")],
  },
  {
    _id: new Types.ObjectId("652cc0836aac8a68e5d20d60"),
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: [new Types.ObjectId("652cc0836aac8a68e5d20d61")],
    postId: [new Types.ObjectId("652cc0836aac8a68e5d20d62")],
  },
  {
    _id: new Types.ObjectId("652cc0836aac8a68e5d20d63"),
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: [new Types.ObjectId("652cc0836aac8a68e5d20d64")],
    postId: [new Types.ObjectId("652cc0836aac8a68e5d20d65")],
  },
  {
    _id: new Types.ObjectId("652cc0836aac8a68e5d20d66"),
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: [new Types.ObjectId("652cc0836aac8a68e5d20d67")],
    postId: [new Types.ObjectId("652cc0836aac8a68e5d20d68")],
  },
  {
    _id: new Types.ObjectId("652cc0836aac8a68e5d20d69"),
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: [new Types.ObjectId("652cc0836aac8a68e5d20d6a")],
    postId: [new Types.ObjectId("652cc0836aac8a68e5d20d6b")],
  },
];

export const seedLike = async () => {
  const { collections } = mongoose.connection;
  const likeCollection = collections["likes"];
  console.log(
    "Inserted Doc Ids: ",
    await likeCollection.insertMany(rawLikeData)
  );
};
