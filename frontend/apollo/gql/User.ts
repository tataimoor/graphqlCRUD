import { gql } from '@apollo/client';
export const GET_USERS=gql`
query ($take: Int, $skip: Int) {
  users {
    count
    docs(take: $take,skip: $skip) {
      email,
      name,
      _id,
      type
    }
  }
}
`