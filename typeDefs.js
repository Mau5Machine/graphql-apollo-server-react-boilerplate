const { gql } = require("apollo-server");

export default gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    username: String
    phone: String
    password: String
    createdAt: String
  }

  type Query {
    users: [User!]!
    info: String!
  }

  type Mutation {
    createUser(firstName: String!, lastName:String!,email: String!, username: String!, password: String!, phone: String!): AuthPayLoad
    login(username: String!, password: String!): AuthPayLoad
    deleteUser(userId: ID!): User
  }

  type AuthPayLoad {
    token: String!
    user: User
  }
`;
