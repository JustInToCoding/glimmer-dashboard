import ApolloClient, { createNetworkInterface } from 'apollo-client';

export default class Store extends ApolloClient {
  static create(_injections: any) : Store {
    return new this({
      networkInterface: createNetworkInterface({
        uri: 'https://thawing-headland-78405.herokuapp.com/graphql',
      }),
    });
  }
}
