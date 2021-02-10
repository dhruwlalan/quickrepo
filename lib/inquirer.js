const inquirer = require('inquirer');
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
               return 'please enter your personal access token.';
            },
         },
      ]);
   },

   askNewRepositoryDetails() {
      return inquirer.prompt([
         {
            name: 'name',
            type: 'input',
            message: 'name of your repository:',
            default: files.getCurrentDirectoryBase(),
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
};
