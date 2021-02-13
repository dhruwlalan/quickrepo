const { Octokit } = require('@octokit/rest');
const shell = require('shelljs');
const ora = require('ora');
const logUpdate = require('log-update');
const info = require('./info');
const { log, cyanB } = require('./clogs');
const inquirer = require('./inquirer');
const store = require('./store');

module.exports = {
   // Repo Stuff..
   async createOctokitInstance() {
      const token = store.getToken();
      if (!token) {
         log.warn('you dont have a token stored in the app, add a token first');
         log.hint('to add a token you can run either of the below two commands:', 'add-token');
         process.exit();
      }
      const spinner = ora(cyanB('verifying stored token...')).start();
      try {
         const octokit = new Octokit({
            auth: store.getToken(),
         });
         const { status } = await octokit.request('/');
         if (status === 200) {
            spinner.stop();
            return octokit;
         }
         spinner.stop();
         log.error('your stored token has become invalid, try adding a new one');
         log.hint('to add a token you can run either of the below two commands:', 'add-token');
         process.exit();
      } catch (error) {
         spinner.stop();
         log.error('your stored token has become invalid, try adding a new one');
         log.hint('to add a token you can run either of the below two commands:', 'add-token');
         process.exit();
      }
   },
   async createRepository() {
      if (info.isGitRepo) {
         log.warn('current directory is already a git repository!');
         process.exit();
      }
      try {
         const octokit = await this.createOctokitInstance();
         const answers = await inquirer.askRemoteRepositoryDetails();
         logUpdate(cyanB('creating remote repository...'));
         const { data } = await octokit.repos.createForAuthenticatedUser({
            name: answers.name,
            description: answers.description,
            private: answers.visibility === 'private',
         });
         logUpdate.clear();
         const res = await this.createLocalRepository(data.ssh_url);
         if (res) {
            log.success('created repository successfully!');
         }
         process.exit();
      } catch (error) {
         if (error.status === 422) {
            log.error(`unable to create repository: name already exists!`);
         } else {
            log.error(`error code: ${error.status}`);
            log.error(error.message);
         }
         process.exit();
      }
   },
   async createLocalRepository(url) {
      try {
         shell.exec('git init', { silent: true });
         shell.exec(`git remote add origin ${url}`, { silent: true });
         if (store.getAutoCommit() !== 'no') {
            if (info.containsContent) {
               if (store.getAutoCommit() !== 'yes') {
                  const { initialCommit } = await inquirer.askToCreateInitialCommit();
                  if (initialCommit) {
                     const { initialCommitMessage } = await inquirer.askInitialCommitMessage();
                     store.setAutoCommitMessage(initialCommitMessage);
                  } else {
                     return true;
                  }
               }
               logUpdate(cyanB('pushing local repository...'));
               shell.exec('git add .', { silent: true });
               shell.exec(`git commit -m "${store.getAutoCommitMessage()}"`, { silent: true });
               shell.exec('git branch -M master', { silent: true });
               shell.exec('git push -u origin master', { silent: true });
               logUpdate.clear();
            }
            return true;
         }
         return true;
      } catch (error) {
         throw new Error(error.message);
      }
   },
};
