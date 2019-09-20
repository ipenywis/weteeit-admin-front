import { gql } from 'apollo-boost';

export const GetAuthAdmin = gql`
  query GET_AUTH_ADMIN {
    authAdmin: getAuthenticated {
      email
      username
    }
  }
`;
