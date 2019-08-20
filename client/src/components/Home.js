import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_USERS } from "../graphql/queries";
import UserComponent from './UserComponent';
import List from '@material-ui/core/List';
import Container from '@material-ui/core/Container';

const Home = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return "Loading....";
  if (error) return `Error! ${error.message}`;

  return (
    <Container>
      <h1>Main App Page</h1>
      <List>
        {data.users.map(user => (
          <UserComponent user={user} />
        ))}
      </List>
    </Container>
  );
};

export default Home;
