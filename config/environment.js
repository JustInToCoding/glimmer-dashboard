'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'glimmer-dashboard',
    environment: environment,
    moduleConfiguration: {
      types: {
        application: { definitiveCollection: 'main' },
        component: { definitiveCollection: 'components' },
        helper: { definitiveCollection: 'components' },
        renderer: { definitiveCollection: 'main' },
        template: { definitiveCollection: 'components' },
        store: { definitiveCollection: 'utils' }
      },
      collections: {
        main: {
          types: ['application', 'renderer']
        },
        components: {
          group: 'ui',
          types: ['component', 'template', 'helper'],
          defaultType: 'component',
          privateCollections: ['utils']
        },
        styles: {
          group: 'ui',
          unresolvable: true
        },
        utils: {
          unresolvable: true
        }
      }
    }
  };

  if(ENV.environment === 'development') {
    ENV.apiUri = 'http://localhost:4000/graphql';
  }

  if(ENV.environment === 'production') {
    ENV.apiUri = 'https://thawing-headland-78405.herokuapp.com/graphql';
  }

  return ENV;
};
