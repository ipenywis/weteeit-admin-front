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

export const UPDATE_SHIPPING = gql`
  mutation UPDATE_SHIPPING($id: Int!, $wilaya: String!, $price: Int!) {
    shippingUpdated: updateShipping(
      id: $id
      updateShippingInput: { wilaya: $wilaya, price: $price }
    )
  }
`;
