import mongoose, { Types } from "mongoose";

export const rawPostData = [
  {
    _id: new Types.ObjectId("6524d86a4efc23b0c481e14a"),
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "nLsur48FuS",
    content: "SX2qdLTLrg",
    imageUrl: "TOkTA06BGo",
    creator: new Types.ObjectId("6524d86a4efc23b0c481e14b"),
  },
  {
    _id: new Types.ObjectId("6524d86a4efc23b0c481e14c"),
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "MYbh4DyEXs",
    content: "I5jThD0an2",
    imageUrl: "kooKLtDRku",
    creator: new Types.ObjectId("6524d86a4efc23b0c481e14d"),
  },
  {
    _id: new Types.ObjectId("6524d86a4efc23b0c481e14e"),
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "ESypcB1X2H",
    content: "sm58gvBOUY",
    imageUrl: "Yzsn7A6v13",
    creator: new Types.ObjectId("6524d86a4efc23b0c481e14f"),
  },
  {
    _id: new Types.ObjectId("6524d86a4efc23b0c481e150"),
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "xbUVWAv4eO",
    content: "E6tb0Cy7wT",
    imageUrl: "MGqSswmf6G",
    creator: new Types.ObjectId("6524d86a4efc23b0c481e151"),
  },
  {
    _id: new Types.ObjectId("6524d86a4efc23b0c481e152"),
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "8wRL6zqi3a",
    content: "kNHmnFLpqM",
    imageUrl: "NrNIDhvJ5B",
    creator: new Types.ObjectId("6524d86a4efc23b0c481e153"),
  },
];

export const seedPost = async () => {
  const { collections } = mongoose.connection;
  const postCollection = collections["posts"];
  console.log(
    "Inserted Doc Ids: ",
    await postCollection.insertMany(rawPostData)
  );
};
