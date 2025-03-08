import {gql} from "@apollo/client";

export const loginUser = gql`
  query loginUser($email: String!, $password: String!) {
    loginUser(data: {email: $email, password: $password}) {
      firstname
      lastname
      email
    }
  }
`;
