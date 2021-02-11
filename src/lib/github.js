const { Octokit } = require('@octokit/rest');
const ConfigStore = require('configstore');
const simpleGit = require('simple-git');
const pkg = require('../../package.json');
const inquirer = require('./inquirer');
const files = require('./files');

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
      if (files.isGitRepo(process.cwd())) {
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
            auto_init: false,
         });
         return res.data.ssh_url;
      } catch (error) {
         console.log(error);
      }
   },

   async createLocalRepository(url) {
      const git = simpleGit();

      if (files.containsContent(process.cwd())) {
         try {
            await git.init();
            await git.addRemote('origin', url);
            const { initialCommit } = await inquirer.askToCreateInitialCommit();
            if (initialCommit) {
               const { initialCommitMessage } = await inquirer.askInitialCommitMessage();
               await git.add('.');
               await git.commit(initialCommitMessage);
               await git.branch(['-M', 'master']);
               await git.push('origin', 'master', ['-u']);
            }
         } catch (error) {
            throw new Error(error.message);
         }
      } else {
         try {
            await git.init();
            await git.addRemote('origin', url);
         } catch (error) {
            throw new Error(error.message);
         }
      }
   },
};
