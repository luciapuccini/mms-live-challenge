import { gql } from "@apollo/client";

export const GET_ISSUE = gql`
  query GetIssue($number: Int!) {
    repository(owner: "facebook", name: "react") {
      issue(number: $number) {
        id
        title
        number
        state
        createdAt
        body
        url
        author {
          login
        }
      }
    }
  }
`;
