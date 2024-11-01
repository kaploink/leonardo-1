import { ApolloClient, InMemoryCache } from "@apollo/client";

export const rickAndMortyApiClient = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});
