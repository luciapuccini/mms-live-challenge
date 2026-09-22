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
            title: 'Issue one'
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
