const { gql } = require("apollo-server");

export default gql`
  type User {
    _id: ID
    name: String
    email: String
  }

  type Query {
    users: [User!]!
  }
`;
