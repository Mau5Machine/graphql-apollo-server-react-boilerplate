import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { WebSocketLink } from "apollo-link-ws";
import App from "./pages/App";
import * as serviceWorker from "./serviceWorker";

const GRAPHQL_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? "ws://35.231.210.149:4000/graphql"
    : "ws://localhost:4000/graphql";

const cache = new InMemoryCache();

const link = new WebSocketLink({
  uri: GRAPHQL_ENDPOINT,
  options: {
    reconnect: true
  }
});

const client = new ApolloClient({
  cache,
  link
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
