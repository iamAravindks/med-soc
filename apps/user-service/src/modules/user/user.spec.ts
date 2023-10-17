import { Types } from "mongoose";
import { TestDB } from "../../__test__/test-db";
import TestApolloServer from "../../__test__/test-server";
import {
  LoginErrorOperation,
  LoginOperation,
  createUserOperation,
  deleteUserErrorOperation,
  deleteUserOperation,
  forgotPasswordOperation,
  getAllUserCountOperation,
  getAllUserOperation,
  getCurrentUserErrorOperation,
  getCurrentUserOperation,
  getOneUserOperation,
  getProfileOperation,
  getUserByIdOperation,
  resetPasswordOption,
  updateUserErrorOperation,
  updateUserOperation,
} from "./__test__/operations";
import { rawUserData, seedUser } from "./__test__/seed";

describe("User Module", () => {
  const server = new TestApolloServer();
  const updateUserIdOne = rawUserData[2]._id;
  const updateUserIdTwo: string = "";
  const notFoundId = new Types.ObjectId("6523f4262508bac2ee14c69e");

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
      },
      server
    );
  });

  it("Positive - MUTATION: UPDATE USER ", async () => {
    await updateUserOperation(
      {
        _id: updateUserIdOne.toString(),
        email: "0QhIVAP@gmail.com",
        name: "RGkRPehPIF",
        bio: "QWEUslxvmT",
        status: "P6mZ9Qo4vz",
        imageUrl: "Xp5ayXzjq7",
      },
      server
    );
  });

  it("Negative - MUTATION: UPDATE USER Error ", async () => {
    await updateUserErrorOperation(
      {
        _id: notFoundId.toString(),
        email: "0QhIVAP@gmail.com",
        name: "RGkRPehPIF",
        bio: "QWEUslxvmT",
        status: "P6mZ9Qo4vz",
        imageUrl: "Xp5ayXzjq7",
      },
      server
    );
  });
  it("Positive - MUTATION: DELETE USER", async () => {
    await deleteUserOperation(String(rawUserData[3]._id.valueOf()), server);
  });

  it("Negative - MUTATION: DELETE USER ERROR", async () => {
    await deleteUserErrorOperation(String(notFoundId.toString()), server);
  });

  it("Negative - QUERY: LOGIN USER ERROR", async () => {
    await LoginErrorOperation(
      {
        email: "d4vm5hJ@gmail.com",
        password: "jGnEjicwY",
      },
      server
    );
  });
  it("Positive - QUERY: LOGIN USER", async () => {
    await LoginOperation(
      {
        email: "d4vm5hJ@gmail.com",
        password: "jGnEjicwYU",
      },
      server
    );
  });

  it("POSITIVE - QUERY: GET CURRENT USER", async () => {
    await getCurrentUserOperation(server);
  });
  it("POSITIVE - QUERY: GET CURRENT USER", async () => {
    await getCurrentUserErrorOperation(server);
  });

  it("POSITIVE - QUERY:GET CURRENT USER PROFILE", async () => {
    await getProfileOperation(updateUserIdOne.toString(), server);
  });

  it("POSITIVE - QUERY: GET FORGOT PASSWORD TOKEN", async () => {
    await forgotPasswordOperation("d4vm5hJ@gmail.com", server);
  });

  it("POSITIVE - MUTATION:RESET PASSWORD", async () => {
    await resetPasswordOption({ password: "12345678" }, server);
  });
});
