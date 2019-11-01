import gql from 'graphql-tag';

export const STORE_SHIPPING = gql`
  mutation STORE_SHIPPING($wilaya: String!, $price: Int!) {
    shipping: storeShipping(
      newShippingInput: { wilaya: $wilaya, price: $price }
    ) {
      id
      wilaya
      price
    }
  }
`;
