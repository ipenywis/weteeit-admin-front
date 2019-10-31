import gql from 'graphql-tag';

export const ORDER_SHIPPED = gql`
  mutation ORDER_SHIPPED($id: Int!) {
    orderShipped(id: $id)
  }
`;
