import inquirer from 'inquirer';
import info from '../utils/info';

export default {
   // setup
   askAddToken(newToken?: boolean): Promise<{ token: string }> {
      return inquirer.prompt([
         {
            name: 'token',
            type: 'input',
            message: newToken
               ? 'enter a new personal access token:'
               : 'enter personal access token:',
            validate(value) {
               if (value.length) {
                  return true;
               }
               return 'please enter your personal access token.';
            },
         },
      ]);
   },
   askConfirmAddNewToken(): Promise<{ addNewToken: boolean }> {
      return inquirer.prompt([
         {
            name: 'addNewToken',
            type: 'confirm',
            message:
               'are you sure you want to add a new personal access token:',
            default: false,
            validate(value) {
               if (value.length) {
                  return true;
               }
               return 'please enter your choice.';
            },
         },
      ]);
   },

   // repo
   askRemoteRepositoryDetails(): Promise<{
      name: string;
      description: string;
      visibility: 'public' | 'private';
   }> {
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
   askToCreateInitialCommit(): Promise<{ initialCommit: boolean }> {
      return inquirer.prompt([
         {
            name: 'initialCommit',
            type: 'confirm',
            message: 'do you want to creat an initial commit',
            default: true,
            validate(value) {
               if (value.length) {
                  return true;
               }
               return 'please enter your choice.';
            },
         },
      ]);
   },
   askInitialCommitMessage(): Promise<{ initialCommitMessage: string }> {
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
