import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql';

const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
});

const peopleData = [
  { id: 1, name: 'John Smith', age: 20 },
  { id: 2, name: 'Sara Smith', age: 25 },
  { id: 3, name: 'Budd Deey', age: 30 },
];

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    people: {
      type: new GraphQLList(PersonType),
      resolve: () => peopleData,
    },
  },
});

var MutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'mutation',
  fields: () => ({
    upsertAge: {
      type: PersonType,
      description: 'Updates the age of a document',
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: (value, { id, age }) => {
        // update the age in the real document
        peopleData[id].age = age;

        // example of not returning the full document
        return {
          id,
          age,
        };
      }
    }
  }),
});

export const schema = new GraphQLSchema({ query: QueryType, mutation: MutationType });
