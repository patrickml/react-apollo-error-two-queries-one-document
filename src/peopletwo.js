import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class PeopleTwo extends Component {
  render() {
    const { data: { loading, people } } = this.props;

    if (loading) {
      return <p>Loading…</p>;
    }

    return (
      <ul>
        {
          people.map(person => (
            <li key={person.id}>
              {person.name}
              {` - `}
              {person.age}
            </li>
          ))
        }
      </ul>
    );
  }
}

export default graphql(
  gql`{
    people {
      __typename
      id
      age
    }
  }`,
)(PeopleTwo)
