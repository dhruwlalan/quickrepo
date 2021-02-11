const { Octokit } = require('@octokit/rest');
const ora = require('ora');
const chalk = require('chalk');
const inquirer = require('./inquirer');
const config = require('./config');

module.exports = {
   async addToken() {
      const { newToken } = await inquirer.askNewToken();
      const spinner = ora(chalk.cyan.bold('verifying Token...')).start();
      const user = await this.verifyToken(newToken);
      if (user) {
         spinner.stop();
         console.log(chalk.green.bold('✔ token added successfully!'));
         config.setToken(newToken);
         return true;
      }
      spinner.stop();
      console.log(chalk.red.bold('✖ provided token is invalid!'));
      return false;
   },
   async verifyToken(token) {
      try {
         if (token !== '') {
            const octokit = new Octokit({
               auth: token,
            });
            const { data } = await octokit.request('/user');
            return data;
         }
      } catch (error) {
         return false;
      }
   },
};
