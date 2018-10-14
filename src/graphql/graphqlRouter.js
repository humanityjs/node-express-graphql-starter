import { makeExecutableSchema } from 'graphql-tools';
import { ApolloServer } from 'apollo-server-express';
import { merge } from 'lodash';
import { userTypes } from './types';
import { userResolvers } from './resolvers';

const createServer = (() => {
  const baseSchema = `
  schema {
    query: Query
  }
`;

  const schema = makeExecutableSchema({
    typeDefs: [baseSchema, userTypes],
    resolvers: merge({}, userResolvers)
  });

  return new ApolloServer({
    schema,
    formatError: error => ({
      name: error.name,
      message: error.message.replace('Context creation failed:', '')
    }),
    context: async ({ req }) => ({
      req
    })
  });
})();

export default createServer;
