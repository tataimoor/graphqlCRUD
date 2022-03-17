import { gql } from "@apollo/client";
export const GET_COMMENTS = gql`
  query comments($take: Int, $skip: Int) {
    comments {
      count
      docs(take: $take, skip: $skip) {
        email
        text
    }
  }
`;

export const ADD_Comment = gql`
  mutation upsertComment($input: CommentInput) {
    comment(input: $input) {
      _id
      email
      text
    }
  }
`;

export const DELETE_Comment = gql`
  mutation deleteComment($input: String!) {
    deleteUser(input: $input) {
      _id
      email
      text
    }
  }
`;
