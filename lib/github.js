const { Octokit } = require('@octokit/rest');
const ConfigStore = require('configstore');
const _ = require('lodash');
const pkg = require('../package.json');
const inquirer = require('./inquirer');

const config = new ConfigStore(pkg.name);

module.exports = {
   getStoredGithubToken() {
      return config.get('token');
   },

   async registerToken() {
      try {
         const { token } = await inquirer.askGithubToken();
         if (token) {
            config.set('token', token);
         }
      } catch (error) {
         console.log(error);
      }
   },

   // const octokit = new Octokit({
   //    auth: token,
   // });
   // const { data } = await octokit.request("/user");
};
