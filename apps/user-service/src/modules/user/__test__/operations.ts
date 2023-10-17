import {
  CreateUserInput,
  QueryLoginArgs,
  UpdateUserInput,
} from "@med-soc/codegen-sdk/dist/generated/sdk";
import { get, omit } from "lodash";
import {
  ContextValueType,
  MockContextValue,
} from "../../../__test__/context-mock";
import TestApolloServer from "../../../__test__/test-server";
import {
  createUser,
  currentUser,
  deleteUser,
  forgotPassword,
  getAllUser,
  getAllUserCount,
  getOneUser,
  getProfile,
  getUserById,
  loginUser,
  resetPassword,
  updateUser,
} from "./queries";

let token: string | undefined;
let loggedUserId: string | undefined;
let forgotPasswordToken: string | undefined;

export const getUserByIdOperation = async (
  userId: string,
  server: TestApolloServer
) => {
  const result = await server.apollo.executeOperation(getUserById(userId), {
    contextValue: MockContextValue(
      ContextValueType.mhToken,
      server.redisClient
    ),
  });

  const refinedResult = get(result, "body.singleResult.data.getUserById");
  const refinedError = get(result, "body.singleResult.errors");
  expect(refinedError).toBeUndefined();
  expect(get(refinedResult, "_id")).toEqual(userId);
};

export const getAllUserOperation = async (
  userId: string,
  server: TestApolloServer
) => {
  const result = await server.apollo.executeOperation(
    getAllUser("", { _id: { $eq: userId } }, { createdAt: 1 }, 10, 0),
    {
      contextValue: MockContextValue(
        ContextValueType.mhToken,
        server.redisClient
      ),
    }
  );

  const refinedResult = get(result, "body.singleResult.data.getAllUser");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(get(refinedResult, "0._id")).toEqual(userId);
};

export const getOneUserOperation = async (
  userId: string,
  server: TestApolloServer
) => {
  const result = await server.apollo.executeOperation(
    getOneUser({ _id: { $eq: userId } }, { createdAt: 1 }),
    {
      contextValue: MockContextValue(
        ContextValueType.mhToken,
        server.redisClient
      ),
    }
  );

  const refinedResult = get(result, "body.singleResult.data.getOneUser");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(get(refinedResult, "_id")).toEqual(userId);
};

export const getAllUserCountOperation = async (server: TestApolloServer) => {
  const result = await server.apollo.executeOperation(getAllUserCount("", {}), {
    contextValue: MockContextValue(
      ContextValueType.mhToken,
      server.redisClient
    ),
  });

  const refinedResult = get(result, "body.singleResult.data.getAllUserCount");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(refinedResult).toEqual(5);
};

export const createUserOperation = async (
  data: CreateUserInput,
  server: TestApolloServer
) => {
  const result = await server.apollo.executeOperation(createUser(data), {
    contextValue: MockContextValue(
      ContextValueType.mhToken,
      server.redisClient
    ),
  });

  const refinedResult = omit(
    get(result, "body.singleResult.data.createUser"),
    "password"
  );
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(refinedResult).toEqual(omit(data, "password"));
};

export const updateUserOperation = async (
  data: UpdateUserInput,
  server: TestApolloServer
) => {
  const result = await server.apollo.executeOperation(updateUser(data), {
    contextValue: MockContextValue(
      ContextValueType.mhToken,
      server.redisClient
    ),
  });

  const refinedResult = omit(
    get(result, "body.singleResult.data.updateUser"),
    "password"
  );
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(refinedResult).toEqual(expect.objectContaining(data));
};

export const updateUserErrorOperation = async (
  data: UpdateUserInput,
  server: TestApolloServer
) => {
  const result = await server.apollo.executeOperation(updateUser(data), {
    contextValue: MockContextValue(
      ContextValueType.mhToken,
      server.redisClient
    ),
  });

  const refinedError: any[] | undefined = get(
    result,
    "body.singleResult.errors",
    []
  );

  expect(
    refinedError?.some((error) => error.message === "user not found")
  ).toBe(true);
};

export const deleteUserOperation = async (
  userId: string,
  server: TestApolloServer
) => {
  const result = await server.apollo.executeOperation(deleteUser(userId), {
    contextValue: MockContextValue(
      ContextValueType.mhToken,
      server.redisClient
    ),
  });

  const refinedResult = get(result, "body.singleResult.data.deleteUser");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(get(refinedResult, "_id")).toEqual(userId);
};

export const deleteUserErrorOperation = async (
  userId: string,
  server: TestApolloServer
) => {
  const result = await server.apollo.executeOperation(deleteUser(userId), {
    contextValue: MockContextValue(
      ContextValueType.mhToken,
      server.redisClient
    ),
  });

  const refinedError: any[] | undefined = get(
    result,
    "body.singleResult.errors",
    []
  );

  expect(
    refinedError?.some((error) => error.message === "user not found")
  ).toBe(true);
};

export const LoginErrorOperation = async (
  data: QueryLoginArgs,
  server: TestApolloServer
) => {
  const result = await server.apollo.executeOperation(loginUser(data), {
    contextValue: MockContextValue(
      ContextValueType.mhToken,
      server.redisClient
    ),
  });

  const refinedError: any[] | undefined = get(
    result,
    "body.singleResult.errors",
    []
  );

  expect(refinedError).not.toBeNull();
};
export const LoginOperation = async (
  data: QueryLoginArgs,
  server: TestApolloServer
) => {
  const result = await server.apollo.executeOperation(loginUser(data), {
    contextValue: MockContextValue(
      ContextValueType.mhToken,
      server.redisClient
    ),
  });
  const refinedResult: any = get(result, "body.singleResult.data.login");
  const refinedError = get(result, "body.singleResult.errors");

  if (refinedResult?.token) token = refinedResult?.token as unknown as string;
  if (refinedResult?.userId)
    loggedUserId = refinedResult?.userId as unknown as string;

  expect(refinedError).toBeUndefined();
  expect(refinedResult).toHaveProperty("refreshToken");
  expect(refinedResult).toHaveProperty("token");
  expect(refinedResult).toHaveProperty("userId");
};

export const getCurrentUserOperation = async (server: TestApolloServer) => {
  const result = await server.apollo.executeOperation(currentUser(), {
    contextValue: MockContextValue(
      ContextValueType.authenticated,
      server.redisClient,
      "Bearer " + token
    ),
  });

  const refinedResult: any = get(result, "body.singleResult.data.current_user");
  const refinedError = get(result, "body.singleResult.errors");
  expect(refinedError).toBeUndefined();
  expect(refinedResult).toHaveProperty("_id");
  expect(refinedResult).toHaveProperty("createdAt");
  expect(refinedResult).toHaveProperty("updatedAt");
  expect(refinedResult).toHaveProperty("name");
  expect(refinedResult).toHaveProperty("email");
  expect(refinedResult).toHaveProperty("bio");
  expect(refinedResult).toHaveProperty("status");
  expect(refinedResult).toHaveProperty("imageUrl");

  // expect(
  //   refinedError?.some((error: any) => error.hasOwnProperty("message"))
  // ).toBe(true);
};

export const getCurrentUserErrorOperation = async (
  server: TestApolloServer
) => {
  const result = await server.apollo.executeOperation(currentUser(), {
    contextValue: MockContextValue(
      ContextValueType.authenticated,
      server.redisClient,
      "Bearer " + "fsadkfhaskdfjaksdjhaskdjhjasdfhasjb dj"
    ),
  });

  const refinedError = get(result, "body.singleResult.errors", []);
  expect(
    refinedError?.some((error: any) => error.message === "verification failed")
  ).toBe(true);
};

export const getProfileOperation = async (
  userId: string,
  server: TestApolloServer
) => {
  const result = await server.apollo.executeOperation(getProfile(), {
    contextValue: MockContextValue(
      ContextValueType.userId,
      server.redisClient,
      token,
      loggedUserId
    ),
  });

  const refinedResult: any = get(result, "body.singleResult.data.getProfile");
  const refinedError = get(result, "body.singleResult.errors");
  expect(refinedResult).toMatchObject({
    _id: expect.anything(),
    createdAt: expect.anything(),
    updatedAt: expect.anything(),
    name: expect.anything(),
    email: expect.anything(),
    bio: expect.anything(),
    status: expect.anything(),
    imageUrl: expect.anything(),
  });

  expect(refinedError).toBeUndefined();
};

export const forgotPasswordOperation = async (
  email: string,
  server: TestApolloServer
) => {
  const result = await server.apollo.executeOperation(forgotPassword(email), {
    contextValue: MockContextValue(
      ContextValueType.mhToken,
      server.redisClient
    ),
  });
  const refinedResult: string | any = get(
    result,
    "body.singleResult.data.forgotPassword"
  );
  if (refinedResult) forgotPasswordToken = refinedResult;
  expect(refinedResult).not.toBeUndefined();
};

export const resetPasswordOption = async (
  data: { password: string },
  server: TestApolloServer
) => {
  const result = await server.apollo.executeOperation(
    resetPassword({ ...data, resetToken: forgotPasswordToken }),
    {
      contextValue: MockContextValue(
        ContextValueType.mhToken,
        server.redisClient
      ),
    }
  );
  const refinedResult: string | any = get(
    result,
    "body.singleResult.data.resetPassword"
  );
  const refinedError = get(result, "body.singleResult.errors");
  expect(refinedError).toBeUndefined();
  expect(refinedResult).toHaveProperty("_id");
  expect(refinedResult).toHaveProperty("email");
};
