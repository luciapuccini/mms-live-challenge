import { GET_ISSUE } from '@/graphql/getIssue'

export const mocksSuccess = [
  {
    request: { query: GET_ISSUE, variables: { number: 123 } },
    result: {
      data: {
        repository: {
          __typename: 'Repository',
          issue: {
            __typename: 'Issue',
            id: '1',
            number: 123,
            title: 'Issue one',
            state: 'OPEN',
            createdAt: '2023-01-01T00:00:00Z',
            author: { __typename: 'User', login: 'alice' },
            body: 'First line\nSecond line',
            url: 'https://github.com/facebook/react/issues/123'
          }
        }
      }
    }
  }
]

export const mocksError = [
  {
    request: { query: GET_ISSUE, variables: { number: 123 } },
    error: new Error('Network error')
  }
]
