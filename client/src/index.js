import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { WebSocketLink } from "apollo-link-ws";
import { setContext } from "apollo-link-context";
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { AUTH_TOKEN } from './constants'
import App from "./pages/App";
import * as serviceWorker from "./serviceWorker";

const GRAPHQL_ENDPOINT_WS =
  process.env.NODE_ENV === "production"
    ? "ws://35.231.210.149:4000/graphql"
    : "ws://localhost:4000/graphql";
const GRAPHQL_ENDPOINT_HTTP =
  process.env.NODE_ENV === "production"
    ? "http://35.231.210.149:4000/graphql"
    : "http://localhost:4000/graphql";

const httpLink = new HttpLink({ uri: GRAPHQL_ENDPOINT_HTTP })

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(AUTH_TOKEN);

  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  })

  return forward(operation);
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
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
