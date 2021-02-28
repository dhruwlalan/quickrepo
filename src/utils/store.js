const ConfigStore = require('configstore');
const pkg = require('../../package.json');

const config = new ConfigStore(pkg.name);
if (!config.has('ranSetup')) config.set('ranSetup', false);
if (!config.has('token')) config.set('token', null);
if (!config.has('autoCommit')) config.set('autoCommit', 'ask each time');
if (!config.has('autoCommitMessage')) config.set('autoCommitMessage', 'Initial Commit');
if (!config.has('hints')) config.set('hints', 'on');

module.exports = {
   viewConfig() {
      return config.all;
   },
   clearConfig() {
      config.clear();
   },

   ranSetup(completed) {
      if (completed) {
         config.set('ranSetup', true);
      } else {
         return config.get('ranSetup');
      }
   },

   getToken() {
      return config.get('token');
   },
   setToken(token) {
      config.set('token', token);
   },

   getAutoCommit() {
      return config.get('autoCommit');
   },
   setAutoCommit(value) {
      config.set('autoCommit', value);
   },

   getAutoCommitMessage() {
      return config.get('autoCommitMessage');
   },
   setAutoCommitMessage(value) {
      config.set('autoCommitMessage', value);
   },

   getHints() {
      return config.get('hints');
   },
   setHints(value) {
      config.set('hints', value);
   },
};
