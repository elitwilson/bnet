Package.describe({
  name: 'elitwilson:accounts-bnet',
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
  api.versionsFrom('1.1.0.2');
  api.addFiles('accounts-bnet.js');
  api.use('accounts-base', ['client', 'server']);
  // Export Accounts (etc) to packages using this one.
  api.imply('accounts-base', ['client', 'server']);
  api.use('accounts-oauth', ['client', 'server']);
  api.use('elitwilson:bnet', ['client', 'server']);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('elitwilson:accounts-bnet');
  api.addFiles('accounts-bnet-tests.js');
});
