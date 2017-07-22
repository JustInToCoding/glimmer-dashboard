import { setupRenderingTest } from '@glimmer/test-helpers';
//import hbs from '@glimmer/inline-precompile';

const { module, test } = QUnit;

export default module('Component: glimmer-dashboard', function(hooks) {
  setupRenderingTest(hooks);

  // test('it renders', async function(assert) {
  //   await this.render(hbs`<glimmer-dashboard />`);
  //   assert.equal(this.containerElement.textContent, 'Welcome to Glimmer!\n');
  // });
});
