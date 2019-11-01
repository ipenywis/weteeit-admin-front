import gql from 'graphql-tag';

export const GET_SHIPPINGS = gql`
  query GET_SHIPPINGS {
    shippings {
      id
      wilaya
      price
    }
  }
`;
