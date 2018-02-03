var allTestFiles = []
var TEST_REGEXP = /(spec|test)\.js$/i

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function (file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    // then do not normalize the paths
    var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '')
    allTestFiles.push(normalizedTestModule)
  }
})

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base/app/scripts',

  paths: {
      alert: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/alert',
      angular: '../../bower_components/angular/angular',
      'angular-translate': '../../bower_components/angular-translate/angular-translate',
      button: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/button',
      bootstrap: '../../bower_components/bootstrap/dist/js/bootstrap',
      bloodhound: '../../bower_components/corejs-typeahead/dist/bloodhound',
      carousel: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/carousel',
      collapse: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/collapse',
      dropdown: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/dropdown',
      'es5-shim': '../../bower_components/es5-shim/es5-shim',
      jquery: '../../bower_components/jquery/dist/jquery',
      json3: '../../bower_components/json3/lib/json3',
      modal: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/modal',
      moment: '../../bower_components/moment/moment',
      popover: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/popover',
      requirejs: '../../bower_components/requirejs/require',
      scrollspy: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/scrollspy',
      util: '../../bower_components/bootstrap/js/dist/util',
      tab: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tab',
      tooltip: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tooltip',
      typeahead: '../../bower_components/corejs-typeahead/dist/typeahead.bundle',
      'typeahead-jquery': '../../bower_components/corejs-typeahead/dist/typeahead.jquery',
      tether: '../../bower_components/tether/dist/js/tether',
      'corejs-typeahead': '../../bower_components/corejs-typeahead/dist/typeahead.bundle',
      'angular-bootstrap': '../../bower_components/angular-bootstrap/ui-bootstrap-tpls',
      'angular-jwt': '../../bower_components/angular-jwt/dist/angular-jwt',
      'jwt-decode': '../../bower_components/jwt-decode/build/jwt-decode',
      'angular-resource': '../../bower_components/angular-resource/angular-resource',
      affix: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/affix',
      transition: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/transition',
      'angular-ui-router': '../../bower_components/angular-ui-router/release/angular-ui-router',
      'bootstrap-sass': '../../bower_components/bootstrap-sass/assets/javascripts/bootstrap',
      'bootstrap-sass-official': '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap',
      'angular-route': '../../bower_components/angular-route/angular-route',
      'ng-file-upload': '../../bower_components/ng-file-upload/ng-file-upload'
  },
  shim: {
      angular: {
          deps: [
              'jquery'
          ]
      },
      'angular-bootstrap': {
          deps: [
              'angular'
          ]
      },
      'angular-jwt': {
          deps: [
              'angular'
          ]
      },
      'angular-resource': {
          deps: [
              'angular'
          ]
      },
      bootstrap: {
          deps: [
              'jquery',
              'modal'
          ]
      },
      modal: {
          deps: [
              'jquery'
          ]
      },
      tooltip: {
          deps: [
              'jquery'
          ]
      },
      typeahead: {
          deps: [
              'jquery'
          ]
      },
      bloodhound: {
          deps: [
              'jquery'
          ]
      },
      'typeahead-jquery': {
          deps: [
              'jquery'
          ]
      },
      'angular-translate': {
          deps: [
              'angular'
          ]
      },
      'angular-ui-router': {
          deps: [
              'angular'
          ]
      },
      'ng-file-upload': {
          deps: [
              'angular'
          ]
      }
  },
  packages: [

  ],

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
})
