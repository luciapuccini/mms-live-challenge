import { ApolloProvider } from "@apollo/client/react";
import { apolloClient } from "@/lib/apolloClient";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IssueList } from "@/components/IssueList";
import { Layout } from "@/components/Layout";

export function App(): JSX.Element {
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IssueList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}
