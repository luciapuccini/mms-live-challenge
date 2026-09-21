// React is provided by the JSX runtime; no import required
import { useQuery } from '@apollo/client/react'
import { Link } from 'react-router-dom'
import { GET_REACT_ISSUES } from '@/graphql/getReactIssues'
import type { GetReactIssuesData, IssueEdge } from './IssueList.types'
import styles from './IssueList.module.css'
import { Card } from '@/components/Card'
import cardStyles from '@/components/Card/Card.module.css'

export function IssueList(): JSX.Element {
  const { data, loading, error } = useQuery<GetReactIssuesData>(GET_REACT_ISSUES)

  if (loading) return <div data-testid="loading-state" className={styles.loading}>Loading issues...</div>
  if (error) return <div data-testid="error-state" className={styles.error}>Error: {error.message}</div>

  const edges: IssueEdge[] = data?.repository?.issues?.edges ?? []

  return (
    <div className={styles.list}>
      {edges.map((edge) => {
        const issue = edge.node
        return (
          <Card key={issue.id} className={cardStyles.itemCard}>
            <div className={cardStyles.itemInner} role="article" aria-labelledby={`issue-${issue.id}`}>
              <div className={cardStyles.meta}>
                <div id={`issue-${issue.id}`} className={cardStyles.metaLine}>#{issue.number} • <span className={[cardStyles.metaState, issue.state === 'OPEN' ? cardStyles.open : issue.state === 'CLOSED' ? cardStyles.closed : ''].filter(Boolean).join(' ')}>{issue.state}</span></div>
                <div className={cardStyles.title}>{issue.title}</div>
                <div className={cardStyles.byline}>By {issue.author?.login ?? 'unknown'} on {new Date(issue.createdAt).toLocaleDateString()}</div>
              </div>
              <div className={cardStyles.actions}>
                <Link to="#" className={cardStyles.viewLink} aria-label={`View issue ${issue.number}`}>View</Link>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
