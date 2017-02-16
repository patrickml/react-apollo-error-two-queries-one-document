import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import update from 'immutability-helper';

class UpsertAge extends Component {
  render() {
    const { upsertAge, id } = this.props;

    return (
      <button onClick={() => upsertAge(id, Math.random() * 100 | 0)}>Random Age</button>
    );
  }
}

const upsertAge = gql`
  mutation upsertAge( $id: Int!, $age: Int! ) {
    upsertAge(id: $id, age: $age) {
      __typename
      id
      name
      age
    }
  }
`;

export default graphql(upsertAge, {
  props: ({ mutate, ownProps }) => {
    return {
      upsertAge: (id, age) => {
        console.log(id, age);
        mutate({
          variables: { id, age },
          optimisticResponse: {
            __typename: 'Mutation',
            upsertAge: {
              __typename: 'Person',
              id,
              age,
            },
          },
        });
      },
    };
  },
})(UpsertAge);
