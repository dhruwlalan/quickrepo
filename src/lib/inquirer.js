const inquirer = require('inquirer');
const info = require('./info');

module.exports = {
   askGithubToken() {
      return inquirer.prompt([
         {
            name: 'token',
            type: 'input',
            message: 'Enter your personal access token:',
            validate(value) {
               if (value.length) {
                  return true;
               }
               return 'please enter your personal access token.';
            },
         },
      ]);
   },

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
