import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class PeopleTwo extends Component {
  render() {
    const { data: { loading, person } } = this.props;

    if (loading) {
      return <p>Loading…</p>;
    }

    return (
      <ul>
        <li>Person ID: {person.id} - Age: {person.age}</li>
      </ul>
    );
  }
}

const peopleTwoQuery = gql`
  query PersonTwo($id: Int!) {
    person(id: $id) {
      __typename
      id
      age
    }
  }
`

export default graphql(peopleTwoQuery, {
  options: ({ id }) => ({
    variables: { id }
  }),
})(PeopleTwo)
