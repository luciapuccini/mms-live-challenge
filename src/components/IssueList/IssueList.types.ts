export type IssueAuthor = {
  login?: string | null
}

export type IssueNode = {
  id: string
  title: string
  number: number
  state: string
  createdAt: string
  author?: IssueAuthor | null
}

export type IssueEdge = {
  node: IssueNode
}

export type GetReactIssuesData = {
  repository?: {
    issues?: {
      edges?: IssueEdge[] | null
    } | null
  } | null
}
