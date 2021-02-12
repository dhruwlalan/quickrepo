const { Octokit } = require('@octokit/rest');
const {
   whiteBright,
   cyanBright,
   red,
   blue,
   green,
   cyan,
   yellowBright,
   bold,
} = require('colorette');
const ora = require('ora');
const inquirer = require('./inquirer');
const store = require('./store');

module.exports = {
   async confirmNewToken() {
      const { confirmNewToken } = await inquirer.askConfirmNewToken();
      return confirmNewToken;
   },
   async addNewToken() {
      const { newToken } = await inquirer.askAddNewToken();
      const user = await this.displayVerifyToken(newToken);
      if (user) {
         store.setToken(newToken);
         return true;
      }
      return false;
   },
   async displayVerifyToken(token) {
      if (!token) {
         console.log(yellowBright('⚠ you dont have a token stored in the app.'));
         console.log(whiteBright('to add a token you can run either of the below two commands:'));
         console.log(cyanBright('$ quickrepo add-token\n$ qr add-token'));
         return false;
      }
      const spinner = ora(bold(cyan('verifying Token...'))).start();
      const user = await this.verifyToken(token);
      if (user) {
         spinner.stop();
         console.log(bold(green('✔ token is valid!')));
         return user;
      }
      spinner.stop();
      console.log(bold(red('✖ token is invalid!')));
      return false;
   },
   async verifyToken(token) {
      if (!token) {
         return 'noToken';
      }
      try {
         const octokit = new Octokit({
            auth: token,
         });
         const { data } = await octokit.request('/user');
         if (data) {
            return data;
         }
         return false;
      } catch (error) {
         return false;
      }
   },
   async deleteToken() {
      if (!store.getToken()) {
         console.log(yellowBright('⚠ you dont have a token stored in the app to delete.'));
         process.exit();
      } else {
         const { deleteToken } = await inquirer.askDeleteToken();
         if (deleteToken) {
            store.setToken(null);
         }
         return deleteToken;
      }
   },
};
