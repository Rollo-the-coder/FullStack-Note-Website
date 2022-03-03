import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import GlobalStyle from '/components/GlobalStyle';
import Pages from '/pages';

//for some reason the v6 of react-router-dom was breaking my program

//configure our API URI & Cache
const uri = process.env.API_URI;
const cache = new InMemoryCache();

//configure Apollo Client
const client = new ApolloClient({
  uri,
  cache,
  connectToDevTools: true,
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
