import { useEffect, useRef } from "react";
import { useQuery } from "@apollo/client/react";
import { useParams } from "react-router-dom";
import { GET_ISSUE } from "@/graphql/getIssue";
import type { GetIssueData } from "./IssueDetail.types";
import { Card } from "@/components/Card";
import cardStyles from "@/components/Card/Card.module.css";
import listStyles from "@/components/IssueList/IssueList.module.css";
import styles from "./IssueDetail.module.css";

export function IssueDetail(): JSX.Element {
  const { number } = useParams();
  const { data, loading, error } = useQuery<GetIssueData>(GET_ISSUE, {
    variables: { number: Number(number) },
  });
  const issue = data?.repository?.issue;
  const bodyRef = useRef<HTMLDivElement>(null);

  // the body html comes from GitHub, so its links need the same new-tab
  // treatment as the "View on GitHub" link below
  useEffect(() => {
    bodyRef.current?.querySelectorAll("a").forEach((a) => {
      a.target = "_blank";
      a.rel = "noreferrer";
    });
  }, [issue?.bodyHTML]);

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
          #{issue.number} •{" "}
          <span
            className={[
              cardStyles.metaState,
              issue.state === "OPEN"
                ? cardStyles.open
                : issue.state === "CLOSED"
                  ? cardStyles.closed
                  : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {issue.state}
          </span>
        </div>
        <h2>{issue.title}</h2>
        <div className={cardStyles.byline}>
          By {issue.author?.login ?? "unknown"} on{" "}
          {new Date(issue.createdAt).toLocaleDateString()}
        </div>
        {/* GitHub sanitizes bodyHTML server-side, so no parser or sanitizer here */}
        <div
          ref={bodyRef}
          data-testid="issue-body"
          className={styles.body}
          dangerouslySetInnerHTML={{ __html: issue.bodyHTML }}
        />
        <a
          href={issue.url}
          className={cardStyles.viewLink}
          target="_blank"
          rel="noreferrer"
          aria-label={`View issue ${issue.number} on GitHub (opens a new tab)`}
        >
          View on GitHub
        </a>
      </div>
    </Card>
  );
}
