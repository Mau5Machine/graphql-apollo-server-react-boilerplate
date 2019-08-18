import gql from 'graphql-tag';

export const SIGN_UP_MUTATION = gql`
  mutation($firstName: String!, $lastName: String!, $email: String!, $username: String!, $password: String!, $phone: String!) {
    createUser(input: {
      firstName: $firstName
      lastName: $lastName
      email: $email
      username: $username
      password: $password
      phone: $phone
    }) {
      _id
      firstName
      lastName
      email
      username
      phone
    }
  }
`