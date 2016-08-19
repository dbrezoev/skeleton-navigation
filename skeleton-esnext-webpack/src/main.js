// we want font-awesome to load as soon as possible to show the fa-spinner
import '../styles/styles.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';

// comment out if you don't want a Promise polyfill (remove also from webpack.common.js)
import * as Bluebird from 'bluebird';
import {ViewLocator} from 'aurelia-framework';
Bluebird.config({ warnings: false });

export async function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-i18n', (instance) => {
      // adapt options to your needs (see http://i18next.com/pages/doc_init.html)
      instance.setup({
        detectFromHeaders: false,
        lng: 'bg',
        fallbackLng: 'bg',
        ns: 'app',
        resGetPath: 'assets/locales/__lng__/__ns__.json',
        attributes: ['t', 'i18n'],
        useCookie: false,
        getAsync: false,
        debug: false
      });
    })
    .feature('features/utils')
    .feature('features/elements/assign')
    .feature('features/elements/buttons')
    .feature('features/value-converters')
    .feature('features/elements/grid')
    .feature('features/elements/date-time-picker');

    ViewLocator.prototype.convertOriginToViewUrl = function (origin) {
      let moduleId = origin.moduleId
      let id = (moduleId.endsWith('.js') || moduleId.endsWith('.ts')) ? moduleId.substring(0, moduleId.length - 3) : moduleId
      return id + '.jade'
    }

  // Uncomment the line below to enable animation.
  // aurelia.use.plugin('aurelia-animator-css');
  // if the css animator is enabled, add swap-order="after" to all router-view elements

  // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin('aurelia-html-import-template-loader')

  await aurelia.start();
  aurelia.setRoot('app');

  // if you would like your website to work offline (Service Worker), 
  // install and enable the @easy-webpack/config-offline package in webpack.config.js and uncomment the following code:
  /*
  const offline = await System.import('offline-plugin/runtime');
  offline.install();
  */
}