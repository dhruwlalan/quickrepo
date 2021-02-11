const ConfigStore = require('configstore');
const pkg = require('../../package.json');
const inquirer = require('./inquirer');

const config = new ConfigStore(pkg.name);
if (!config.has('ranSetup')) config.set('ranSetup', false);
if (!config.has('token')) config.set('token', '');
if (!config.has('autoCommit')) config.set('autoCommit', false);
if (!config.has('autoCommitMessage')) config.set('autoCommitMessage', 'Initial Commit');

module.exports = {
   viewConfig() {
      return config.all;
   },
   async editConfig() {
      const answers = await inquirer.askEditConfig();
      if (answers.autoCommit !== 'no') {
         this.setAutoCommit(true);
         this.setAutoCommitMessage(answers.autoCommitMessage);
      } else {
         this.setAutoCommit(false);
         this.setAutoCommitMessage(answers.autoCommitMessage);
      }
   },

   // getters & setters:
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
};
