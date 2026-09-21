import { GET_REACT_ISSUES } from '@/graphql/getReactIssues'

export const mocksSuccess = [
  {
    request: { query: GET_REACT_ISSUES },
    result: {
      data: {
        repository: {
          __typename: 'Repository',
          issues: {
            __typename: 'IssueConnection',
            edges: [
              {
                __typename: 'IssueEdge',
                node: {
                  __typename: 'Issue',
                  id: '1',
                  number: 123,
                  title: 'Issue one',
                  state: 'OPEN',
                  createdAt: '2023-01-01T00:00:00Z',
                  author: { __typename: 'User', login: 'alice' }
                }
              },
              {
                __typename: 'IssueEdge',
                node: {
                  __typename: 'Issue',
                  id: '2',
                  number: 124,
                  title: 'Issue two',
                  state: 'CLOSED',
                  createdAt: '2023-01-02T00:00:00Z',
                  author: { __typename: 'User', login: 'bob' }
                }
              }
            ]
          }
        }
      }
    }
  }
]

export const mocksError = [
  {
    request: { query: GET_REACT_ISSUES },
    error: new Error('Network error')
  }
]
