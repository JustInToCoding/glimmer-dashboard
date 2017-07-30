'use strict';

const GlimmerApp = require('@glimmer/application-pipeline').GlimmerApp;
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const replace = require('rollup-plugin-replace');
// const globals = require('rollup-plugin-node-globals');
// const builtins = require('rollup-plugin-node-builtins');

module.exports = function(defaults) {
  let app = new GlimmerApp(defaults, {
    // Add options here
    sassOptions: {
      includePaths: [
        'node_modules'
      ]
    },
    rollup: {
      entry: 'main.js',
      plugins: [
        babel({
          exclude: 'node_modules/**',
          plugins: [
            "graphql-tag"
          ]
        }),
        resolve({ jsnext: true, module: true, main: true }),
        replace({
            'process.env.NODE_ENV': JSON.stringify( 'development' ),
            '__DEV__': JSON.stringify( true )
        }),
        commonjs(),
        // globals(),
        // builtins()
      ]
    }
  });

  // app.package = function(jsTree, cssTree, publicTree, htmlTree) {
  //   console.log(cssTree);
  // }

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
