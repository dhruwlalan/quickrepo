const { Octokit } = require('@octokit/rest');
const ora = require('ora');
const { whiteB, blueB, greenB, cyanB, log } = require('./clogs');
const inquirer = require('./inquirer');
const store = require('./store');

module.exports = {
   viewToken() {
      const storedToken = store.getToken();
      if (!storedToken) {
         log.warn('you dont have a token stored in the app');
         log.hint('to add a token you can run either of the below two commands:', 'add-token');
      } else {
         console.log(`${cyanB('token')} ${whiteB('—→')} ${greenB(storedToken)}`);
      }
      process.exit();
   },
   async addNewToken() {
      try {
         const spinner = ora(cyanB('checking stored token...')).start();
         const oldUser = await this.verifyToken(store.getToken());
         spinner.stop();
         if (oldUser && oldUser !== 'not-stored') {
            log.warn('you already have a valid stored token, adding a new one would replace it');
            const { confirmNewToken } = await inquirer.askConfirmNewToken();
            if (!confirmNewToken) {
               process.exit();
            }
         }
         const { newToken } = await inquirer.askAddNewToken();
         const newUser = await this.displayVerifyToken(newToken);
         if (newUser) {
            store.setToken(newToken);
            log.success('token added successfully!');
         }
         process.exit();
      } catch (error) {
         console.log(error.message);
         process.exit();
      }
   },
   async deleteToken() {
      try {
         const spinner = ora(cyanB('checking stored token...')).start();
         const user = await this.verifyToken(store.getToken());
         spinner.stop();

         if (user === 'not-stored') {
            log.warn('you dont have a token stored in the app to delete');
            process.exit();
         } else if (user && user !== 'not-stored') {
            log.warn('you already have a valid stored token');
         } else {
            log.info('your stored token has become invalid, better delete it');
         }

         const { deleteToken } = await inquirer.askDeleteToken();
         if (deleteToken) {
            store.setToken(null);
            log.success('token deleted successfully!');
         }
         process.exit();
      } catch (error) {
         console.log(error.message);
         process.exit();
      }
   },
   async getUserFromToken() {
      try {
         const user = await this.displayVerifyToken(store.getToken());
         if (user) {
            console.log(`${blueB('username')} ${whiteB('—→')} ${cyanB(user.login)}`);
            console.log(`${blueB('github-url')} ${whiteB('—→')} ${cyanB(user.html_url)}`);
         } else {
            log.warn('the stored token has become invalid');
            log.info('kindly add a valid new token');
            log.hint(
               'to add a new token you can run either of the below two commands:',
               'add-token',
            );
         }
         process.exit();
      } catch (error) {
         console.log(error.message);
         process.exit();
      }
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
};
