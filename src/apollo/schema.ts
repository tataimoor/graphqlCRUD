import { gql } from "apollo-server";
export const TypeDef = gql`
  type User {
    _id: String
    name: String
    email: String
    type: Int
  }
  input UserInput {
    name: String!
    email: String!
    type: Int!
    password: String
  }

  input UserUpdate {
    _id: String!
    name: String!
    email: String!
    type: Int!
    password: String
  }
  type UserResponse {
    docs(take: Int, skip: Int): [User]
    count: Int
  }

  type Query {
    users: UserResponse
    user(_id: String!): User
  }

  type Mutation {
    addUser(input: UserInput): User
    updateUser(input: UserUpdate): User
    deleteUser(input: String!): User
  }
`;
