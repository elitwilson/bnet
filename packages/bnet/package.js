Package.describe({
  name: 'elitwilson:bnet',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  //Using Facebook as a basis for my own code. Clean up when implemented.

  api.versionsFrom('1.1.0.2');
  api.use('oauth2', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('http', ['server']);
  api.use('templating', 'client');
  api.use('underscore', 'server');
  //api.use('random', 'client');
  api.use('service-configuration', ['client', 'server']);

  //api.export('Facebook');

  /*api.addFiles(
    ['facebook_configure.html', 'facebook_configure.js'],
    'client');*/

  api.addFiles('bnet_server.js', 'server');
  api.addFiles('bnet_client.js', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('elitwilson:bnet');
  api.addFiles('bnet-tests.js');  
});
