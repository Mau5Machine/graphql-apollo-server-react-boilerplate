import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_USERS } from "../graphql/queries";

const Home = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return "Loading....";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <h1>Main App Page</h1>
      <ul>
        {data.users.map(user => (
          <li key={user._id}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
