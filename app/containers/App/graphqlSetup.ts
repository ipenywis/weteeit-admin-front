import ApolloClient, { DefaultOptions } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-boost';

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

export const apolloClient = new ApolloClient({
  link: createHttpLink({ uri: 'http://localhost:3000/graphql' }),
  cache: new InMemoryCache(),
  defaultOptions,
});
