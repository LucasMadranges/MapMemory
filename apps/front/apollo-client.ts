import {ApolloClient, InMemoryCache} from "@apollo/client";

const PORT_GATEWAY = process.env["PORT_GATEWAY"] || "3000";

export const client = new ApolloClient({
  uri: `http://localhost:${PORT_GATEWAY}/graphql`,
  cache: new InMemoryCache(),
  ssrMode: typeof window === "undefined", // Active le mode SSR si on est côté serveur
});
