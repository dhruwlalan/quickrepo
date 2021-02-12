const { Octokit } = require('@octokit/rest');
const { white, red, blue, green, cyan, bold } = require('colorette');
const ora = require('ora');
const inquirer = require('./inquirer');
const store = require('./store');

module.exports = {
   async addToken() {
      const { newToken } = await inquirer.askNewToken();
      const user = await this.verifyToken(newToken);
      if (user) {
         store.setToken(newToken);
         return true;
      }
      return false;
   },
   async verifyToken(token) {
      if (!token) {
         console.log(bold(white('there is no stored token!')));
         console.log(bold(blue('run add-token to add a new token.')));
         return false;
      }
      const spinner = ora(bold(cyan('verifying Token...'))).start();
      try {
         const octokit = new Octokit({
            auth: token,
         });
         const { data } = await octokit.request('/user');
         if (data) {
            spinner.stop();
            console.log(bold(green('✔ token is valid!')));
         }
         return data;
      } catch (error) {
         spinner.stop();
         console.log(bold(red('✖ token is invalid!')));
         return false;
      }
   },
};
