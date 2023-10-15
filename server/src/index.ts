import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './graphql/schemas/typeDefs';
import resolvers from './graphql/resolvers/resolvers';7

const server = new ApolloServer({
  typeDefs: typeDefs.definitions,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then((result) => {
  console.log(`🚀  Server ready at: ${result.url}`);
}).catch((error) => {
  console.error("Failed to start server with error: ", error);
});
