import Component from "@glimmer/component";
import gql from 'graphql-tag';
import Store from '../../../utils/store';

export default class GlimmerDashboard extends Component {
  store: Store;

  constructor(options: object) {
    super(options);

    this.store.query({
      query: gql`
        query Activities {
          activities {
            id
            name
            description
          }
        }
      `,
    })
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }
}
