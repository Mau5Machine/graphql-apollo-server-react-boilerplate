import gql from 'graphql-tag';

export const SIGN_UP_MUTATION = gql`
  mutation($firstName: String!, $lastName: String!, $email: String!, $username: String!, $password: String!, $phone: String!) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      username: $username
      password: $password
      phone: $phone
    ) {
      token
      user {
        _id
        username
        firstName
        lastName
      }
    }
  }
`

export const LOGIN_MUTATION = gql`
  mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
        firstName
        lastName
      }
    }
    }
`