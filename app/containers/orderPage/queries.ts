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

export const GET_ORDER_PRODUCTS = gql`
  query GET_ORDER_PRODUCTS($orderId: Int!) {
    orderProducts(id: $orderId) {
      product {
        id
        available
        name
        price
        type
        imageUrl
      }
      quantity
    }
  }
`;

export const GET_SHIPPING = gql`
  query GET_SHIPPING($wilaya: String!) {
    shipping(wilaya: $wilaya) {
      price
    }
  }
`;
