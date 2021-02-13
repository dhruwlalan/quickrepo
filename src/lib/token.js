const { Octokit } = require('@octokit/rest');
const ora = require('ora');
const { cyanB, log } = require('./clogs');
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
         log.warn('you dont have a token stored in the app');
         log.hint('to add a token you can run either of the below two commands:', 'add-token');
         process.exit();
      }
      const spinner = ora(cyanB('verifying Token...')).start();
      const user = await this.verifyToken(token);
      if (user) {
         spinner.stop();
         log.success('token is valid!');
         return user;
      }
      spinner.stop();
      log.error('token is invalid!');
      return false;
   },
   async verifyToken(token) {
      if (!token) {
         return 'not-stored';
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
         log.warn('you dont have a token stored in the app to delete');
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
