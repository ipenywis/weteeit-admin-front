import { ApolloClient, DefaultOptions } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import * as cookies from 'js-cookie';
import { AUTH_COOKIE_KEY } from 'common';

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

const httpLink = createHttpLink({ uri: 'http://localhost:3000/graphql' });

//Authentication
const authLink = setContext((_, { headers }) => {
  const token = cookies.get(AUTH_COOKIE_KEY);
  console.log('TOKEN: ', token);
  return {
    headers: {
      ...headers,
      [AUTH_COOKIE_KEY]: token,
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions,
});
