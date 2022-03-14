import { gql } from "apollo-server";

const UserFragemnt = `
_id: String
name: String
email: String
type: Int
`;
export const TypeDef = gql`
  type User {
    ${UserFragemnt}
  }
  
  input UserInput {
    ${UserFragemnt}
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
    user(input: UserInput): User
    deleteUser(input: String!): User
  }
`;
