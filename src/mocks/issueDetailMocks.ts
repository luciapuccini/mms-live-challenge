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
            bodyHTML:
              '<h2>First line</h2>\n<ul>\n<li>Second line with <code>code</code></li>\n</ul>\n<p><a href="https://example.com">a link</a></p>',
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
