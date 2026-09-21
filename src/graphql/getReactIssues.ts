import { gql } from '@apollo/client'

export const GET_REACT_ISSUES = gql`
  query GetReactIssues {
    repository(owner: "facebook", name: "react") {
      issues(first: 20, orderBy: {field: CREATED_AT, direction: DESC}) {
        edges {
          node {
            id
            title
            number
            state
            createdAt
            author { login }
          }
        }
      }
    }
  }
`
