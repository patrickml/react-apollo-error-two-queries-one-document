import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import PeopleTwo from './peopletwo';
import UpsertAge from './upsertAge';

class App extends Component {
  render() {
    const { data: { loading, person } } = this.props;
    if (loading) {
      return <p>Loading…</p>;
    }

    return (
      <main>
        <header>
          <h1>Apollo Client Error Template</h1>
          <p>
            This example shows that when one query updates and returns null for values used by
            another query that the other queries values are lost. A great example of this is
            upserting of certain bits of information.
          </p>
          <p>
            Random Person As you can see has a name of <b>`{person.name}`</b>, but when
            you click Random age to upsert the age and include name in the response (since you might use the same upsert hoc)
            for your components. <b>`{person.name}`</b> will disappear
          </p>
        </header>
        <p>Random Person:</p>
        <ul>
          <li>
            Person ID: {person.id} - Person Name: {person.name}
          </li>
        </ul>
        <p>People List:</p>
        <PeopleTwo id={person.id} />
        <UpsertAge id={person.id} />
      </main>
    );
  }
}

const personQuery = gql`
  query Person($id: Int!) {
    person(id: $id) {
      __typename
      id
      name
    }
  }
`;

export default graphql(personQuery, {
  options: () => ({
    variables: {
      id: Math.random() * 3 | 0,
    },
  }),
})(App)
