import gql from 'graphql-tag';

export const STORE_PRODUCT = gql`
  mutation STORE_PRODUCT(
    $name: String!
    $type: String!
    $available: Boolean!
    $price: Int!
    $imageUrl: String!
  ) {
    product: storeProduct(
      newProductData: {
        name: $name
        type: $type
        available: $available
        price: $price
        imageUrl: $imageUrl
      }
    ) {
      id
      name
      type
      available
      price
      imageUrl
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UPDATE_PRODUCT(
    $id: Int!
    $name: String!
    $type: String!
    $available: Boolean!
    $price: Int!
    $imageUrl: String!
  ) {
    product: updateProduct(
      id: $id
      updatedProductData: {
        name: $name
        type: $type
        available: $available
        price: $price
        imageUrl: $imageUrl
      }
    ) {
      id
      name
      type
      available
      price
      imageUrl
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DELETE_PRODUCT($name: String!) {
    isProductDeleted: deleteProduct(name: $name)
  }
`;
