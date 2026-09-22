export type IssueDetailNode = {
  id: string
  title: string
  number: number
}

export type GetIssueData = {
  repository?: {
    issue?: IssueDetailNode | null
  } | null
}
