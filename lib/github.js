const { Octokit } = require('@octokit/rest');
const ConfigStore = require('configstore');
const _ = require('lodash');
const pkg = require('../package.json');
const inquirer = require('./inquirer');

const config = new ConfigStore(pkg.name);

module.exports = {
   getToken() {
      return config.get('token');
   },

   async setToken() {
      try {
         const { token } = await inquirer.askGithubToken();
         if (token) {
            config.set('token', token);
            return token;
         }
         return null;
      } catch (error) {
         console.log(error);
         return null;
      }
   },

   async checkToken(token) {
      const octokit = new Octokit({
         auth: token,
      });
      const { data } = await octokit.request('/user');
      return data;
   },
};
