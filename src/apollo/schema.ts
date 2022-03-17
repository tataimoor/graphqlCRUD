import { gql } from "apollo-server";

const UserFragemnt = `
_id: ID
name: String
email: String
type: Int
`;

const CommentFragemnt = `
_id: ID
email: String
createdDate: String
name: String
postID: String
text: String
`;
export const TypeDef = gql`
  type User {
    ${UserFragemnt}
  }

  type Comment {
    ${CommentFragemnt}
  }
  input CommentInput {
    ${CommentFragemnt}
  }
  
  input UserInput {
    ${UserFragemnt}
    password: String
  }
  
  type UserResponse {
    docs(take: Int, skip: Int, sort:String , order: String,search: String): [User]
    count: Int
  }

  type CommentResponse {
    docs(take: Int, skip: Int): [Comment]
    count: Int
  }

  type Query {
    users: UserResponse
    user(_id: String!): User
    comments:CommentResponse
  }

  type Mutation {
    user(input: UserInput): User
    deleteUser(input: String!): User
    comment(input: CommentInput):Comment
    deleteComment(input: String!):Comment
  }
`;
