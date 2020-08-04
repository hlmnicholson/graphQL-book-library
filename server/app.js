const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { importSchema } = require('graphql-import');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(importSchema('./schema/schema.gql'));

// The root should provide a resolver function for each API endpoint
const { root } = require('./resolvers');

const app = express();

// middleware
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  }),
);

app.listen(4000, () => {
  console.log('Running a GraphQL API server at http://localhost:4000/graphql');
});