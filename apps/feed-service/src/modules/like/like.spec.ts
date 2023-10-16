import { TestDB } from "../../__test__/test-db";
import TestApolloServer from "../../__test__/test-server";
import {
  createLikeOperation,
  createManyLikeOperation,
  deleteLikeOperation,
  deleteManyLikeOperation,
  getAllLikeCountOperation,
  getAllLikeOperation,
  getLikeByIdOperation,
  getOneLikeOperation,
  updateLikeOperation,
  updateManyLikeOperation,
} from "./__test__/operations";
import { rawLikeData, seedLike } from "./__test__/seed";

describe("Like Module", () => {
  const server = new TestApolloServer();
  let updateUserIdOne: string = "";
  let updateUserIdTwo: string = "";

  beforeAll(async () => {
    await server.start();
    await seedLike();
  });

  afterAll(async () => {
    await TestDB.clearData();
    await server.stop();
  });

  it("Positive - QUERY: LIST LIKE BY ID", async () => {
    await getLikeByIdOperation(String(rawLikeData[0]._id.valueOf()), server);
  });

  it("Positive - QUERY: LIST LIKES", async () => {
    await getAllLikeOperation(String(rawLikeData[1]._id.valueOf()), server);
  });

  it("Positive - QUERY: LIST ONE LIKE", async () => {
    await getOneLikeOperation(String(rawLikeData[2]._id.valueOf()), server);
  });

  it("Positive - QUERY: COUNT LIKES", async () => {
    await getAllLikeCountOperation(server);
  });

  it("Positive - MUTATION: CREATE LIKE", async () => {
    await createLikeOperation(
      {
        userId: ["652cc0836aac8a68e5d20d51"],
        postId: ["652cc0836aac8a68e5d20d52"],
      },
      server
    );
  });

  it("Positive - MUTATION: CREATE MANY LIKES", async () => {
    const newUsers = await createManyLikeOperation(
      [
        {
          userId: ["652cc0836aac8a68e5d20d53"],
          postId: ["652cc0836aac8a68e5d20d54"],
        },
        {
          userId: ["652cc0836aac8a68e5d20d55"],
          postId: ["652cc0836aac8a68e5d20d56"],
        },
      ],
      server
    );
    updateUserIdOne = newUsers[0]._id;
    updateUserIdTwo = newUsers[1]._id;
  });

  it("Positive - MUTATION: UPDATE LIKE ", async () => {
    await updateLikeOperation(
      {
        _id: updateUserIdOne,
        userId: ["652cc0836aac8a68e5d20d57"],
        postId: ["652cc0836aac8a68e5d20d58"],
      },
      server
    );
  });

  it("Positive - MUTATION: UPDATE MANY LIKES", async () => {
    await updateManyLikeOperation(
      [
        {
          _id: updateUserIdOne,
          userId: ["652cc0836aac8a68e5d20d59"],
          postId: ["652cc0836aac8a68e5d20d5a"],
        },
        {
          _id: updateUserIdTwo,
          userId: ["652cc0836aac8a68e5d20d5b"],
          postId: ["652cc0836aac8a68e5d20d5c"],
        },
      ],
      server
    );
  });

  it("Positive - MUTATION: DELETE LIKE", async () => {
    await deleteLikeOperation(String(rawLikeData[3]._id.valueOf()), server);
  });

  it("Positive - MUTATION: DELETE LIKE BY FILTER", async () => {
    await deleteManyLikeOperation(String(rawLikeData[4]._id.valueOf()), server);
  });
});
