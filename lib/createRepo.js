const { Octokit } = require('@octokit/rest');
const simpleGit = require('simple-git');
const _ = require('lodash');
const inquirer = require('./inquirer');
const files = require('./files');
const github = require('./github');

module.exports = {
   async createRemoteRepository() {
      const octokit = new Octokit({
         auth: github.getToken(),
      });

      const answers = await inquirer.askNewRepositoryDetails();

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
      const cwd = process.cwd();

      if (!files.isGitRepo(cwd)) {
         if (files.containsContent(cwd)) {
            try {
               await git.init();
               await git.add('.');
               await git.commit('Initial Commit');
               await git.addRemote('origin', url);
               await git.branch(['-M', 'master']);
               await git.push('origin', 'master', ['-u']);
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
      } else {
         throw new Error('Current directory is already a git repository!');
      }
   },
};
