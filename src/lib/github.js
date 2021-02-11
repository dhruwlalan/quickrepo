const { Octokit } = require('@octokit/rest');
const shell = require('shelljs');
const pkg = require('../../package.json');
const info = require('./info');
const inquirer = require('./inquirer');
const config = require('./config');

module.exports = {
   // Token stuff...
   async addToken() {
      const { newToken } = await inquirer.askNewToken();
      if (newToken) {
         config.setToken(newToken);
         return true;
      }
      return false;
   },
   // async verifyToken(token) {
   //    const octokit = new Octokit({
   //       auth: token,
   //    });
   //    const { data } = await octokit.request('/user');
   //    return data;
   // },
   // Repo Stuff..
   // async createRemoteRepository() {
   //    if (info.isGitRepo) {
   //       throw new Error('Current directory is already a git repository!');
   //    }
   //    const octokit = new Octokit({
   //       auth: this.getToken(),
   //    });
   //    const answers = await inquirer.askRemoteRepositoryDetails();
   //    try {
   //       const res = await octokit.repos.createForAuthenticatedUser({
   //          name: answers.name,
   //          description: answers.description,
   //          private: answers.visibility === 'private',
   //       });
   //       return res.data.ssh_url;
   //    } catch (error) {
   //       console.log(error);
   //    }
   // },
   // async createLocalRepository(url) {
   //    if (info.isGitRepo) {
   //       throw new Error('Current directory is already a git repository!');
   //    }
   //    if (info.containsContent) {
   //       try {
   //          shell.exec('git init', { silent: true });
   //          shell.exec(`git remote add origin ${url}`, { silent: true });
   //          const { initialCommit } = await inquirer.askToCreateInitialCommit();
   //          if (initialCommit) {
   //             const { initialCommitMessage } = await inquirer.askInitialCommitMessage();
   //             shell.exec('git add .', { silent: true });
   //             shell.exec(`git commit -m "${initialCommitMessage}"`, { silent: true });
   //             shell.exec('git branch -M master', { silent: true });
   //             shell.exec('git push -u origin master', { silent: true });
   //          }
   //       } catch (error) {
   //          throw new Error(error.message);
   //       }
   //    } else {
   //       try {
   //          shell.exec('git init', { silent: true });
   //          shell.exec(`git remote add origin ${url}`, { silent: true });
   //       } catch (error) {
   //          throw new Error(error.message);
   //       }
   //    }
   // },
};
