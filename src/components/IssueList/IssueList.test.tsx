import { render, screen } from "@testing-library/react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { BrowserRouter } from "react-router-dom";
import { MockLink } from "@apollo/client/testing";
import { IssueList } from "@/components/IssueList";
import { mocksSuccess, mocksError } from "@/mocks/issueListMocks";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderWithMocks(mocks: readonly any[]) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const link = new MockLink(mocks as any);
  const client = new ApolloClient({ cache: new InMemoryCache(), link });
  return render(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <IssueList />
      </BrowserRouter>
    </ApolloProvider>,
  );
}

test("renders loading state", () => {
  renderWithMocks([]);
  expect(screen.getByTestId("loading-state")).toBeInTheDocument();
});

test("renders error state", async () => {
  renderWithMocks(mocksError);
  const el = await screen.findByTestId("error-state");
  expect(el).toBeInTheDocument();
  expect(el).toHaveTextContent("Error: Network error");
});

test("renders list of issues", async () => {
  renderWithMocks(mocksSuccess);

  const item = await screen.findByText("Issue one");
  expect(item).toBeInTheDocument();
  // Meta line uses separate nodes for number and state; assert by id to avoid text-node splitting issues
  const meta = document.getElementById("issue-1");
  expect(meta).toBeInTheDocument();
  expect(meta?.textContent).toMatch(/123/);
  expect(meta?.textContent).toMatch(/OPEN/);
  expect(screen.getByText(/By alice on/)).toBeInTheDocument();
});
