const inquirer = require('inquirer');
const minimist = require('minimist');
const files = require('./files');

module.exports = {
   askGithubToken() {
      const questions = [
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
      ];
      return inquirer.prompt(questions);
   },
};
