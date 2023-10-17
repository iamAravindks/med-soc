import {
  CreateUserInput,
  MutationResetPasswordArgs,
  QueryLoginArgs,
  UpdateUserInput,
} from "@med-soc/codegen-sdk/dist/generated/sdk";

export const getUserById = (_id: string) => {
  return {
    query: ` 
      query getUserById($_id: ID!) {
        getUserById(_id: $_id) {
          _id
          createdAt
          updatedAt
          email
name
password
bio
status
imageUrl
        }
      }
      `,
    variables: {
      _id: _id,
    },
  };
};

export const getAllUser = (
  search: string,
  filter: any,
  sort: any,
  limit: number,
  offset: number
) => {
  return {
    query: `
      query getAllUser($search:String, $filter: JSON, $sort: JSON, $limit: Int, $offset: Int) {
        getAllUser(search:$search, filter: $filter, sort: $sort, limit: $limit, offset: $offset) {
          _id
          createdAt
          updatedAt
          email
name
password
bio
status
imageUrl

        }
      }
  `,
    variables: {
      search: search,
      filter: filter,
      sort: sort,
      limit: limit,
      offset: offset,
    },
  };
};

export const getOneUser = (filter: any, sort: any) => {
  return {
    query: `
      query getOneUser($filter: JSON, $sort: JSON) {
        getOneUser(filter: $filter, sort: $sort) {
          _id
          createdAt
          updatedAt
          email
name
password
bio
status
imageUrl

        }
      }
  `,
    variables: {
      filter: filter,
      sort: sort,
    },
  };
};

export const getAllUserCount = (search: string, filter: any) => {
  return {
    query: `
      query getAllUserCount($search: String, $filter: JSON) {
        getAllUserCount(filter: $filter, search: $search)
      }
  `,
    variables: {
      search: search,
      filter: filter,
    },
  };
};

export const createUser = (data: CreateUserInput) => {
  return {
    query: `
      mutation createUser($data: CreateUserInput!) {
        createUser(data: $data) {
          email
name
bio
status
imageUrl
        }
      }
  `,
    variables: {
      data: data,
    },
  };
};

export const loginUser = (data: QueryLoginArgs) => {
  return {
    query: `
    query Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        refreshToken
        userId
      }
    }
    `,
    variables: {
      email: data.email,
      password: data.password,
    },
  };
};

export const updateUser = (data: UpdateUserInput) => {
  return {
    query: `
      mutation updateUser($data: UpdateUserInput!) {
        updateUser(data: $data) {
          _id
          email
name
bio
status
imageUrl

        }
      }
  `,
    variables: {
      data: data,
    },
  };
};

export const deleteUser = (_id: string) => {
  return {
    query: `
      mutation deleteUser($_id: ID!) {
        deleteUser(_id: $_id) {
          _id
          email
name
bio
status
imageUrl

        }
      }
  `,
    variables: {
      _id: _id,
    },
  };
};
export const currentUser = () => {
  return {
    query: `
    query Current_user {
      current_user {
        _id
        createdAt
        updatedAt
        email
        name
        bio
        status
        imageUrl
      }
    }`,
  };
};

export const getProfile = () => {
  return {
    query: `
    query GetProfile {
      getProfile {
        _id
        createdAt
        updatedAt
        email
        name
        bio
        status
        imageUrl
      }
    }
    `,
  };
};

export const forgotPassword = (email: string) => {
  return {
    query: `
    query Query($email: String!) {
      forgotPassword(email: $email)
    }`,
    variables: {
      email,
    },
  };
};

export const resetPassword = (data: MutationResetPasswordArgs) => {
  return {
    query: `
    mutation ResetPassword($resetToken: String, $password: String) {
      resetPassword(resetToken: $resetToken, password: $password) {
        _id
        email
      }
    }
    `,
    variables: {
      password: data.password,
      resetToken: data.resetToken,
    },
  };
};
