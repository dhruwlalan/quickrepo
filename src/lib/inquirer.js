const inquirer = require('inquirer');
const info = require('./info');

module.exports = {
   // App Setup...
   askRerunSetup() {
      return inquirer.prompt([
         {
            name: 'rerunSetup',
            type: 'confirm',
            message: 'would you like to re-run the setup:',
            default: false,
         },
      ]);
   },

   // App config...
   askEditConfig() {
      return inquirer.prompt([
         {
            name: 'autoCommit',
            type: 'list',
            message: 'do you want to auto commit & push when having contents inside repo:',
            choices: ['yes', 'no', 'ask each time'],
            default: 0,
            validate(value) {
               if (value.length) {
                  return true;
               }
               return 'please enter your auto commit choice';
            },
         },
         {
            name: 'autoCommitMessage',
            type: 'input',
            message: 'default initial auto commit message:',
            default: 'Initial Commit',
            when({ autoCommit }) {
               return autoCommit !== 'no';
            },
            validate(value) {
               if (value.length) {
                  return true;
               }
               return 'please enter your default initial commit message';
            },
         },
      ]);
   },
   askClearConfig() {
      return inquirer.prompt([
         {
            name: 'clearConfig',
            type: 'confirm',
            message: 'are you sure you want to clear app config:',
            default: false,
            validate(value) {
               if (value.length) {
                  return true;
               }
               return 'please enter your choice';
            },
         },
      ]);
   },

   // Token Stuff...
   askNewToken() {
      return inquirer.prompt([
         {
            name: 'newToken',
            type: 'input',
            message: 'add a new personal access token:',
            validate(value) {
               if (value.length) {
                  return true;
               }
               return 'please enter your personal access token.';
            },
         },
      ]);
   },

   // Repo Stuff..
   askRemoteRepositoryDetails() {
      return inquirer.prompt([
         {
            name: 'name',
            type: 'input',
            message: 'name of your repository:',
            default: info.directoryBase,
            validate(value) {
               if (value.length) {
                  return true;
               }
               return 'please enter a name for the repository.';
            },
         },
         {
            name: 'description',
            type: 'input',
            message: 'description of your repository:',
            default: null,
         },
         {
            name: 'visibility',
            type: 'list',
            message: 'visibility of your repository:',
            choices: ['public', 'private'],
            default: 0,
         },
      ]);
   },
   askToCreateInitialCommit() {
      return inquirer.prompt([
         {
            name: 'initialCommit',
            type: 'confirm',
            message: 'do you wish creat an initial commit',
            default: true,
            validate(value) {
               if (value.length) {
                  return true;
               }
               return 'please enter your wish.';
            },
         },
      ]);
   },
   askInitialCommitMessage() {
      return inquirer.prompt([
         {
            name: 'initialCommitMessage',
            type: 'input',
            message: 'enter your initial commit message:',
            default: 'Initial Commit',
            validate(value) {
               if (value.length) {
                  return true;
               }
               return 'please enter your initial commit message.';
            },
         },
      ]);
   },
};
