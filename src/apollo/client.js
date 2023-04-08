import { ApolloClient, InMemoryCache } from "@apollo/client";

/* An instance of the ApolloClient class from the Apollo Client library for
GraphQL. The client is configured with a URI pointing to a GraphQL API endpoint and an in-memory
cache. */
export const client = new ApolloClient({
    uri: 'https://graphql-pokeapi.vercel.app/api/graphql',
    cache: new InMemoryCache()
  });