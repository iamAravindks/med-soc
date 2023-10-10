import { TestDB } from "../../__test__/test-db";
import TestApolloServer from "../../__test__/test-server";
import {
  createUserOperation,
  createManyUserOperation,
  deleteUserOperation,
  deleteManyUserOperation,
  getAllUserCountOperation,
  getAllUserOperation,
  getUserByIdOperation,
  getOneUserOperation,
  updateUserOperation,
  updateManyUserOperation,
} from "./__test__/operations";
import { rawUserData, seedUser } from "./__test__/seed";

describe("User Module", () => {
  const server = new TestApolloServer();
  let updateUserIdOne: string = "";
  let updateUserIdTwo: string = "";

  beforeAll(async () => {
    await server.start();
    await seedUser();
  });

  afterAll(async () => {
    await TestDB.clearData();
    await server.stop();
  });

  it("Positive - QUERY: LIST USER BY ID", async () => {
    await getUserByIdOperation(String(rawUserData[0]._id.valueOf()), server);
  });

  it("Positive - QUERY: LIST USERS", async () => {
    await getAllUserOperation(String(rawUserData[1]._id.valueOf()), server);
  });

  it("Positive - QUERY: LIST ONE USER", async () => {
    await getOneUserOperation(String(rawUserData[2]._id.valueOf()), server);
  });

  it("Positive - QUERY: COUNT USERS", async () => {
    await getAllUserCountOperation(server);
  });

  it("Positive - MUTATION: CREATE USER", async () => {
    await createUserOperation(
      {
        email: "d4vm5hJ@gmail.com",
        name: "rkPHCLuDKI",
        password: "jGnEjicwYU",
        bio: "WtkygO7QNy",
        status: "ED6jB7Cgzk",
        imageUrl: "aAIKdsSH00",
        passwordResetToken: "KL8NgbKpkO",
        passwordTokenExpires: new Date(),
      },
      server
    );
  });

  it("Positive - MUTATION: CREATE MANY USERS", async () => {
    const newUsers = await createManyUserOperation(
      [
        {
          email: "j81Is6f@gmail.com",
          name: "LFZWMpDyLT",
          password: "KRg37jEHQQ",
          bio: "f28lGgJj78",
          status: "CQPggOXYIN",
          imageUrl: "RtDZedN7Av",
          passwordResetToken: "4mKIYALxEc",
          passwordTokenExpires: new Date(),
        },
        {
          email: "FiMS7B3@gmail.com",
          name: "sVuuadhWpp",
          password: "aq9sC6UlqN",
          bio: "jr9lsbxY7R",
          status: "D7hxHDh3dw",
          imageUrl: "X6VajwuCMu",
          passwordResetToken: "e1ATZlQZDI",
          passwordTokenExpires: new Date(),
        },
      ],
      server
    );
    updateUserIdOne = newUsers[0]._id;
    updateUserIdTwo = newUsers[1]._id;
  });

  it("Positive - MUTATION: UPDATE USER ", async () => {
    await updateUserOperation(
      {
        _id: updateUserIdOne,
        email: "0QhIVAP@gmail.com",
        name: "RGkRPehPIF",
        password: "XILc2dPSIR",
        bio: "QWEUslxvmT",
        status: "P6mZ9Qo4vz",
        imageUrl: "Xp5ayXzjq7",
        passwordResetToken: "UOJ9FpuGUo",
        passwordTokenExpires: new Date(),
      },
      server
    );
  });

  it("Positive - MUTATION: UPDATE MANY USERS", async () => {
    await updateManyUserOperation(
      [
        {
          _id: updateUserIdOne,
          email: "IgGVlBZ@gmail.com",
          name: "5bKDScnRyu",
          password: "pHH8bM8tte",
          bio: "ahtX4BqhXF",
          status: "kovPRO6Ucb",
          imageUrl: "9jV0XMp5zS",
          passwordResetToken: "tKxCYxdWZG",
          passwordTokenExpires: new Date(),
        },
        {
          _id: updateUserIdTwo,
          email: "Zi7Qkou@gmail.com",
          name: "o1XUXJCXb3",
          password: "dL5RJ0Yw2g",
          bio: "p3hzMMokTj",
          status: "PO8v4yNZft",
          imageUrl: "R8dX7KalbV",
          passwordResetToken: "8BJ5jr8KKy",
          passwordTokenExpires: new Date(),
        },
      ],
      server
    );
  });

  it("Positive - MUTATION: DELETE USER", async () => {
    await deleteUserOperation(String(rawUserData[3]._id.valueOf()), server);
  });

  it("Positive - MUTATION: DELETE USER BY FILTER", async () => {
    await deleteManyUserOperation(String(rawUserData[4]._id.valueOf()), server);
  });
});
