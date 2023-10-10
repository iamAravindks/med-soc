import { TestDB } from "../../__test__/test-db";
import TestApolloServer from "../../__test__/test-server";
import {
  createPostOperation,
  createManyPostOperation,
  deletePostOperation,
  deleteManyPostOperation,
  getAllPostCountOperation,
  getAllPostOperation,
  getPostByIdOperation,
  getOnePostOperation,
  updatePostOperation,
  updateManyPostOperation,
} from "./__test__/operations";
import { rawPostData, seedPost } from "./__test__/seed";

describe("Post Module", () => {
  const server = new TestApolloServer();
  let updateUserIdOne: string = "";
  let updateUserIdTwo: string = "";

  beforeAll(async () => {
    await server.start();
    await seedPost();
  });

  afterAll(async () => {
    await TestDB.clearData();
    await server.stop();
  });

  it("Positive - QUERY: LIST POST BY ID", async () => {
    await getPostByIdOperation(String(rawPostData[0]._id.valueOf()), server);
  });

  it("Positive - QUERY: LIST POSTS", async () => {
    await getAllPostOperation(String(rawPostData[1]._id.valueOf()), server);
  });

  it("Positive - QUERY: LIST ONE POST", async () => {
    await getOnePostOperation(String(rawPostData[2]._id.valueOf()), server);
  });

  it("Positive - QUERY: COUNT POSTS", async () => {
    await getAllPostCountOperation(server);
  });

  it("Positive - MUTATION: CREATE POST", async () => {
    await createPostOperation(
      {
        title: "6QU2cr7Dxo",
        content: "8k9jt3X0vu",
        imageUrl: "ZK67HD1crW",
        creator: "6524d86a4efc23b0c481e144",
      },
      server
    );
  });

  it("Positive - MUTATION: CREATE MANY POSTS", async () => {
    const newUsers = await createManyPostOperation(
      [
        {
          title: "aNDYlTjOgG",
          content: "HUHU1jQNEm",
          imageUrl: "IMnzTLDUhJ",
          creator: "6524d86a4efc23b0c481e145",
        },
        {
          title: "VXW0QKVHIc",
          content: "mFj5YvR1tx",
          imageUrl: "fzZO8ulItQ",
          creator: "6524d86a4efc23b0c481e146",
        },
      ],
      server
    );
    updateUserIdOne = newUsers[0]._id;
    updateUserIdTwo = newUsers[1]._id;
  });

  it("Positive - MUTATION: UPDATE POST ", async () => {
    await updatePostOperation(
      {
        _id: updateUserIdOne,
        title: "dHQ1WwKERN",
        content: "fyULqB3kdX",
        imageUrl: "gEd7TSgpJZ",
        creator: "6524d86a4efc23b0c481e147",
      },
      server
    );
  });

  it("Positive - MUTATION: UPDATE MANY POSTS", async () => {
    await updateManyPostOperation(
      [
        {
          _id: updateUserIdOne,
          title: "6cPBdpWmyW",
          content: "fheSPPufPV",
          imageUrl: "Kdt34OFBjB",
          creator: "6524d86a4efc23b0c481e148",
        },
        {
          _id: updateUserIdTwo,
          title: "dPmSUIJJwH",
          content: "rPDc5xAK5C",
          imageUrl: "VZHQ1B5UtX",
          creator: "6524d86a4efc23b0c481e149",
        },
      ],
      server
    );
  });

  it("Positive - MUTATION: DELETE POST", async () => {
    await deletePostOperation(String(rawPostData[3]._id.valueOf()), server);
  });

  it("Positive - MUTATION: DELETE POST BY FILTER", async () => {
    await deleteManyPostOperation(String(rawPostData[4]._id.valueOf()), server);
  });
});
