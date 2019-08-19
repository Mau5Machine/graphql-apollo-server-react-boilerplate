import gql from "graphql-tag";

export const GET_USERS = gql`
  {
    users {
      _id
      username
      email
    }
  }
`;
