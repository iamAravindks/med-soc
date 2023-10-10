import mongoose, { Types } from "mongoose";

export const rawUserData = [
  {
    _id: new Types.ObjectId("6523f4262508bac2ee14c697"),
    createdAt: new Date(),
    updatedAt: new Date(),
    email: "Cwncm2P@gmail.com",
    name: "zsvJlAdilF",
    password: "gor5rMFidb",
    bio: "2H9wjGO4od",
    status: "J7l0eeoCSl",
    imageUrl: "7vnFX4xfhb",
    passwordResetToken: "De6Wkqm9vs",
    passwordTokenExpires: new Date(),
  },
  {
    _id: new Types.ObjectId("6523f4262508bac2ee14c698"),
    createdAt: new Date(),
    updatedAt: new Date(),
    email: "YccJnIP@gmail.com",
    name: "9moZmVnhWR",
    password: "2mGAbVZlSW",
    bio: "tP4VtnkaVs",
    status: "hLIdbhK2pE",
    imageUrl: "nJ7e7V2TMU",
    passwordResetToken: "Wsu2i1nT8R",
    passwordTokenExpires: new Date(),
  },
  {
    _id: new Types.ObjectId("6523f4262508bac2ee14c699"),
    createdAt: new Date(),
    updatedAt: new Date(),
    email: "ezZgGbe@gmail.com",
    name: "3CLj6mESey",
    password: "RMF2Pip5Pb",
    bio: "IeSxOpUbw2",
    status: "smxCllpij9",
    imageUrl: "k8rcIAx5fN",
    passwordResetToken: "uVkj7wGNLO",
    passwordTokenExpires: new Date(),
  },
  {
    _id: new Types.ObjectId("6523f4262508bac2ee14c69a"),
    createdAt: new Date(),
    updatedAt: new Date(),
    email: "xJvcviS@gmail.com",
    name: "Om7uyFZBj6",
    password: "1okls7Pu9g",
    bio: "rZXijlSCDW",
    status: "lbEYnMPLx4",
    imageUrl: "rU4BpJm1Ol",
    passwordResetToken: "jNJTtElvpg",
    passwordTokenExpires: new Date(),
  },
  {
    _id: new Types.ObjectId("6523f4262508bac2ee14c69b"),
    createdAt: new Date(),
    updatedAt: new Date(),
    email: "KnrDPgW@gmail.com",
    name: "VtHCznFRza",
    password: "t5hRov3na5",
    bio: "ZYGcAXNUxe",
    status: "qZ70Z0uI5k",
    imageUrl: "UxH9wFDopz",
    passwordResetToken: "c5VGpwXuN0",
    passwordTokenExpires: new Date(),
  },
];

export const seedUser = async () => {
  const { collections } = mongoose.connection;
  const userCollection = collections["users"];
  console.log(
    "Inserted Doc Ids: ",
    await userCollection.insertMany(rawUserData)
  );
};
