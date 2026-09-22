import type { IssueAuthor } from '@/components/IssueList'

export type IssueDetailNode = {
  id: string
  title: string
  number: number
  state: string
  createdAt: string
  /** GitHub renders and sanitizes the markdown body for us: no parser needed */
  bodyHTML: string
  url: string
  author?: IssueAuthor | null
}

export type GetIssueData = {
  repository?: {
    issue?: IssueDetailNode | null
  } | null
}
