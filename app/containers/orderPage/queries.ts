import gql from 'graphql-tag';

export const GET_ORDERS = gql`
  query GET_ORDERS {
    orders {
      id
      transactionId
      wilaya
      firstName
      lastName
      phone
      city
      facebook_profile
      instructions
    }
  }
`;
