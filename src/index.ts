import App from './main';
import { ComponentManager, setPropertyDidChange } from '@glimmer/component';
import Store from './utils/store';

const app = new App();
const containerElement = document.getElementById('app');

setPropertyDidChange(() => {
  app.scheduleRerender();
});

app.registerInitializer({
  initialize(registry) {
    registry.register(`store:/${app.rootName}/utils/store`, Store);
    registry.registerInjection('store', 'env', `environment:/${app.rootName}/main/main`)
    registry.registerInjection('component', 'store', `store:/${app.rootName}/utils/store`);
    registry.register(`component-manager:/${app.rootName}/component-managers/main`, ComponentManager);
  }
});

app.renderComponent('glimmer-dashboard', containerElement, null);

app.boot();
