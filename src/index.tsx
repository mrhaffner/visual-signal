import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloClient, ApolloProvider, split, HttpLink } from '@apollo/client';
import { setContext } from 'apollo-link-context';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import MemberProvider from './providers/MemberProvider';
import cache from './graphql/cache';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('trello-member-token');
  const getToken = token ? `bearer ${token}` : null;
  return {
    headers: {
      ...headers,
      authorization: getToken,
    },
  };
});

const httpLink = new HttpLink({
  uri: 'http://localhost:8080/graphql',
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:8080/graphql',
  options: {
    reconnect: true,
    connectionParams: {
      authorization: localStorage.getItem('trello-member-token')
        ? `bearer ${localStorage.getItem('trello-member-token')}`
        : null,
    },
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  //@ts-ignore
  wsLink,
  //@ts-ignore
  authLink.concat(httpLink),
);

const client = new ApolloClient({
  link: splitLink,
  cache,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router forceRefresh={false}>
        <GlobalStyles />
        <MemberProvider>
          <App />
        </MemberProvider>
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
