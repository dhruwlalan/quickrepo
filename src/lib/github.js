const { Octokit } = require('@octokit/rest');
const ConfigStore = require('configstore');
const shell = require('shelljs');
const pkg = require('../../package.json');
const inquirer = require('./inquirer');
const info = require('./info');

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

   async createRemoteRepository() {
      if (info.isGitRepo) {
         throw new Error('Current directory is already a git repository!');
      }
      const octokit = new Octokit({
         auth: this.getToken(),
      });

      const answers = await inquirer.askRemoteRepositoryDetails();

      try {
         const res = await octokit.repos.createForAuthenticatedUser({
            name: answers.name,
            description: answers.description,
            private: answers.visibility === 'private',
         });
         return res.data.ssh_url;
      } catch (error) {
         console.log(error);
      }
   },

   async createLocalRepository(url) {
      if (info.isGitRepo) {
         throw new Error('Current directory is already a git repository!');
      }
      if (info.containsContent) {
         try {
            shell.exec('git init', { silent: true });
            shell.exec(`git remote add origin ${url}`, { silent: true });
            const { initialCommit } = await inquirer.askToCreateInitialCommit();
            if (initialCommit) {
               const { initialCommitMessage } = await inquirer.askInitialCommitMessage();
               shell.exec('git add .', { silent: true });
               shell.exec(`git commit -m "${initialCommitMessage}"`, { silent: true });
               shell.exec('git branch -M master', { silent: true });
               shell.exec('git push -u origin master', { silent: true });
            }
         } catch (error) {
            throw new Error(error.message);
         }
      } else {
         try {
            shell.exec('git init', { silent: true });
            shell.exec(`git remote add origin ${url}`, { silent: true });
         } catch (error) {
            throw new Error(error.message);
         }
      }
   },
};
