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

export const SHIPPING_EXISTS = gql`
  query SHIPPING_EXISTS($wilaya: String!) {
    exists: shippingExists(wilaya: $wilaya)
  }
`;
