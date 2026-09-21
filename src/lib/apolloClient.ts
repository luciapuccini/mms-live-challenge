import { HttpLink } from "@apollo/client";
import { ApolloClient, InMemoryCache, ApolloLink } from "@apollo/client";

const httpLink = new HttpLink({ uri: "https://api.github.com/graphql" });

const authLink = new ApolloLink((operation, forward) => {
  const token = (import.meta as unknown as { env: Record<string, string> }).env.VITE_GITHUB_TOKEN;
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }));
  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
});
