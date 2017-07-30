import Component, { tracked } from "@glimmer/component";
import gql from 'graphql-tag';
import Store from '../../../utils/store';

interface Activity {
  id: number;
  name: string;
  description: string;
  // start_date: string;
  // end_date: string;
  // position: number;
  // inserted_at: string;
  // updated_at: string;
}

export default class GlimmerDashboard extends Component {
  store: Store;

  @tracked loading = true;
  @tracked activities: Activity[] = [];

  name: string;

  constructor(options: object) {
    super(options);

    // this.store.query<{activities: Activity[]}>({
    //   query: gql`
    //     query Activities {
    //       activities {
    //         id
    //         name
    //         description
    //       }
    //     }
    //   `,
    // })
    //   .then(result => {
    //     // console.log(result);
    //     this.activities = this.deserializeActivities(result.data.activities);
    //     // console.log(this.activities);
    //     this.loading = false;
    //   })
    //   .catch(error => console.error(error));
  }

  deserializeActivities(serializedActivities): Activity[] {
    return serializedActivities.map((serializedActivity) => {
      return {
        id: serializedActivity.id,
        name: serializedActivity.name,
        description: serializedActivity.description
      };
    });
  }

  setInputValue(event) {
    this.name = event.srcElement.value;
  }

  newActivity() {
    this.addActivities({
      id: null,
      name: this.name,
      description: null
      // start_date: undefined,
      // end_date: undefined,
      // position: undefined,
      // inserted_at: undefined,
      // updated_at: undefined
    });
  }

  addActivities(...activities) {
    this.activities = [
      ...this.activities,
      ...activities
    ];
  }
}
