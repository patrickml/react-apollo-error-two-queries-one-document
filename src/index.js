import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { networkInterface } from './graphql/networkInterface';
import App from './App';

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: (o) => {
    /* eslint-disable no-underscore-dangle */
    if (o.__typename && o.id) {
      return `${o.__typename}:${o.id}`;
    }
    /* eslint-enable */
    return o.id;
  },
});

ReactDOM.render(
  <ApolloProvider client={client}><App /></ApolloProvider>,
  document.getElementById('root'),
);
