import {ApolloClient, InMemoryCache} from "@apollo/client";

export const client = new ApolloClient({
  uri: `http://localhost:${process.env.NEXT_PUBLIC_PORT_GATEWAY}/graphql`,
  cache: new InMemoryCache(),
  ssrMode: typeof window === "undefined", // Active le mode SSR si on est côté serveur
});
