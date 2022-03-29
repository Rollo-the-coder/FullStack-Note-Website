import React from 'react';
import ReactDOM from 'react-dom';

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  gql,
} from '@apollo/client';
import { setContext } from 'apollo-link-context';

import GlobalStyle from '/components/GlobalStyle';
import Pages from '/pages';

//for some reason the v6 of react-router-dom was breaking my program

//configure our API URI & Cache
const uri = process.env.API_URI;
const httpLink = createHttpLink({ uri });
const cache = new InMemoryCache();

//check for a token and return the headers to the context
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || '',
    },
  };
});

//configure Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {},
  connectToDevTools: true,
});

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

cache.writeQuery({
  query: IS_LOGGED_IN,
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
  },
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
