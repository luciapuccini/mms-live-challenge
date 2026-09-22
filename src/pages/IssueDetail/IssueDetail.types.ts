import type { IssueAuthor } from '@/components/IssueList'

export type IssueDetailNode = {
  id: string
  title: string
  number: number
  state: string
  createdAt: string
  body: string
  url: string
  author?: IssueAuthor | null
}

export type GetIssueData = {
  repository?: {
    issue?: IssueDetailNode | null
  } | null
}
