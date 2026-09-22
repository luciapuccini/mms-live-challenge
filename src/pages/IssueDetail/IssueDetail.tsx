import { useQuery } from "@apollo/client/react";
import { useParams } from "react-router-dom";
import { GET_ISSUE } from "@/graphql/getIssue";
import type { GetIssueData } from "./IssueDetail.types";
import { Card } from "@/components/Card";
import cardStyles from "@/components/Card/Card.module.css";
import listStyles from "@/components/IssueList/IssueList.module.css";

export function IssueDetail(): JSX.Element {
  const { number } = useParams();
  const { data, loading, error } = useQuery<GetIssueData>(GET_ISSUE, {
    variables: { number: Number(number) },
  });

  if (loading)
    return (
      <div data-testid="loading-state" className={listStyles.loading}>
        Loading issue...
      </div>
    );
  if (error)
    return (
      <div data-testid="error-state" className={listStyles.error}>
        Error: {error.message}
      </div>
    );

  const issue = data?.repository?.issue;
  if (!issue)
    return (
      <div data-testid="not-found-state" className={listStyles.error}>
        Issue not found
      </div>
    );

  return (
    <Card>
      <div role="article" aria-labelledby={`issue-${issue.id}`}>
        <div
          id={`issue-${issue.id}`}
          data-testid="issue-meta"
          className={cardStyles.metaLine}
        >
          #{issue.number}
        </div>
        <h2>{issue.title}</h2>
      </div>
    </Card>
  );
}
