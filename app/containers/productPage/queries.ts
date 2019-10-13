import gql from 'graphql-tag';

export const GET_PRODUCTS_BY_TYPE = gql`
  query PRODUCTS_BY_TYPE($type: String!, $pageId: Int, $limitPerPage: Int) {
    productsWithPagination: productsByType(
      type: $type
      pageId: $pageId
      limitPerPage: $limitPerPage
    ) {
      products {
        id
        name
        type
        available
        price
        imageUrl
      }
      pagination {
        numPages
        pageId
        count
      }
    }
  }
`;

export const PRODUCT_EXISTS = gql`
  query PRODUCT_EXISTS($name: String!) {
    exists: productExists(name: $name)
  }
`;
