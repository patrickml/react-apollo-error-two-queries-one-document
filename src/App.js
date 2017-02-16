import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import PeopleTwo from './peopletwo';
import UpsertAge from './upsertAge';

class App extends Component {
  render() {
    const { data: { loading, people } } = this.props;

    if (loading) {
      return <p>Loading…</p>;
    }

    return (
      <main>
        <header>
          <h1>Apollo Client Error Template</h1>
          <p>
            This is a template that you can use to demonstrate an error in Apollo Client.
            Edit the source code and watch your browser window reload with the changes.
          </p>
          <p>
            The code which renders this component lives in <code>./src/App.js</code>.
          </p>
          <p>
            The GraphQL schema is in <code>./src/graphql/schema</code>.
            Currently the schema just serves a list of people with names and ids.
          </p>
        </header>
        <p>List 1:</p>
        <ul>
          {
            people.map(person => (
              <li key={person.id}>
                {person.name}
              </li>
            ))
          }
        </ul>
        <p>List 2:</p>
        <PeopleTwo />
        <UpsertAge />
      </main>
    );
  }
}

export default graphql(
  gql`{
    people {
      __typename
      id
      name
    }
  }`,
)(App)
