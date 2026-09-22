import { render, screen } from "@testing-library/react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { MockLink } from "@apollo/client/testing";
import { IssueDetail } from "@/pages/IssueDetail";
import { mocksSuccess, mocksError } from "@/mocks/issueDetailMocks";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderWithMocks(mocks: readonly any[], path = "/issues/123") {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const link = new MockLink(mocks as any);
  const client = new ApolloClient({ cache: new InMemoryCache(), link });
  return render(
    <ApolloProvider client={client}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/issues/:number" element={<IssueDetail />} />
        </Routes>
      </MemoryRouter>
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

test("renders the issue of the number in the url", async () => {
  renderWithMocks(mocksSuccess);

  expect(await screen.findByText("Issue one")).toBeInTheDocument();
  expect(screen.getByTestId("issue-meta")).toHaveTextContent("#123");
  expect(screen.getByTestId("issue-meta")).toHaveTextContent("OPEN");
  expect(screen.getByText(/By alice on/)).toBeInTheDocument();
  expect(screen.getByTestId("issue-body")).toHaveTextContent("Second line");
  expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
    "href",
    "https://github.com/facebook/react/issues/123",
  );
});

test("renders the markdown body as html, with links in a new tab", async () => {
  renderWithMocks(mocksSuccess);
  const body = await screen.findByTestId("issue-body");

  // the markdown arrives as real elements, not raw marks
  expect(body.querySelector("h2")).toHaveTextContent("First line");
  expect(body.querySelector("li")).toHaveTextContent("Second line");
  expect(body.querySelector("code")).toHaveTextContent("code");

  const link = body.querySelector("a");
  expect(link).toHaveAttribute("target", "_blank");
  expect(link).toHaveAttribute("rel", "noreferrer");
});
