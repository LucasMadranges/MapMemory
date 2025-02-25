import {gql} from "@apollo/client";

export const getUsers = gql`
  query getUsers {
    getUsers {
      firstname
      lastname
      email
    }
  }
`;
