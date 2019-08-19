import React from "react";
import { useQuery } from "@apollo/react-hooks";
import Button from "@material-ui/core/Button";
import { GET_USERS } from "../graphql/queries";

const Home = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return "Loading....";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <h1>Main App Page</h1>
      <Button variant="contained" color="primary">
        Something
      </Button>
      <ul>
        {data.users.map(user => (
          <li key={user.username}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
