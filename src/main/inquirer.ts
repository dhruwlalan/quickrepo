import inquirer from 'inquirer';
// import info from './info';

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

   // Repo Stuff..
   // askRemoteRepositoryDetails() {
   //    return inquirer.prompt([
   //       {
   //          name: 'name',
   //          type: 'input',
   //          message: 'name of your repository:',
   //          default: info.directoryBase,
   //          validate(value) {
   //             if (value.length) {
   //                return true;
   //             }
   //             return 'please enter a name for the repository.';
   //          },
   //       },
   //       {
   //          name: 'description',
   //          type: 'input',
   //          message: 'description of your repository:',
   //          default: null,
   //       },
   //       {
   //          name: 'visibility',
   //          type: 'list',
   //          message: 'visibility of your repository:',
   //          choices: ['public', 'private'],
   //          default: 0,
   //       },
   //    ]);
   // },
   // askToCreateInitialCommit() {
   //    return inquirer.prompt([
   //       {
   //          name: 'initialCommit',
   //          type: 'confirm',
   //          message: 'do you wish creat an initial commit',
   //          default: true,
   //          validate(value) {
   //             if (value.length) {
   //                return true;
   //             }
   //             return 'please enter your wish.';
   //          },
   //       },
   //    ]);
   // },
   // askInitialCommitMessage() {
   //    return inquirer.prompt([
   //       {
   //          name: 'initialCommitMessage',
   //          type: 'input',
   //          message: 'enter your initial commit message:',
   //          validate(value) {
   //             if (value.length) {
   //                return true;
   //             }
   //             return 'please enter your initial commit message.';
   //          },
   //       },
   //    ]);
   // },
};
