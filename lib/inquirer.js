const inquirer = require('inquirer');
const minimist = require('minimist');
const files = require('./files');

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
               return 'please enter your personal access token:';
            },
         },
      ]);
   },
   askRepositoryDetails() {
      return inquirer.prompt([
         {
            name: 'name of your repository:',
         },
      ]);
   },
};
