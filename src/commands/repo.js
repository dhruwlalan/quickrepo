const { Octokit } = require('@octokit/rest');
const ora = require('ora');
const execa = require('execa');

const info = require('../utils/info');
const { log, cyanB } = require('../utils/clogs');
const inquirer = require('../utils/inquirer');
const store = require('../utils/store');

module.exports = {
   async createOctokitInstance() {
      const token = store.getToken();
      if (!token) {
         log.warn('you dont have a token stored in the app, add a token first');
         log.hint('to add a token you can run the below command:', 'add-token');
         process.exit(1);
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
         log.hint('to add a token you can run the below command:', 'add-token');
         process.exit(1);
      } catch (error) {
         spinner.stop();
         log.error('your stored token has become invalid, try adding a new one');
         log.hint('to add a token you can run the below command:', 'add-token');
         process.exit(1);
      }
   },
   async createRepository() {
      const spinner = ora(cyanB('creating remote repository...'));
      if (info.isGitRepo) {
         log.warn('current directory is already a git repository!');
         process.exit(1);
      }
      try {
         const octokit = await this.createOctokitInstance();
         const answers = await inquirer.askRemoteRepositoryDetails();
         spinner.start();
         const { data } = await octokit.repos.createForAuthenticatedUser({
            name: answers.name,
            description: answers.description,
            private: answers.visibility === 'private',
         });
         spinner.stop();
         const res = await this.createLocalRepository(data.ssh_url);
         if (res) {
            log.success('created repository successfully!');
         }
         process.exit(0);
      } catch (error) {
         spinner.stop();
         if (error.status === 422) {
            log.error(`unable to create repository: name already exists!`);
         } else {
            log.error(`error code: ${error.status}`);
            log.error(error.message);
         }
         process.exit(1);
      }
   },
   async createLocalRepository(url) {
      const spinner = ora();
      try {
         if (!info.containsContent) {
            spinner.start(cyanB('creating local repository...'));
            await execa('git', ['init']);
            await execa('git', ['remote', 'add', 'origin', `${url}`]);
            await this.hold(1000);
            spinner.stop();
            return true;
         }
         if (store.getAutoCommit() !== 'never') {
            if (store.getAutoCommit() !== 'always') {
               const { initialCommit } = await inquirer.askToCreateInitialCommit();
               if (initialCommit) {
                  const { initialCommitMessage } = await inquirer.askInitialCommitMessage();
                  store.setAutoCommitMessage(initialCommitMessage);
               } else {
                  return true;
               }
            }
            spinner.start(cyanB('creating local repository...'));
            await execa('git', ['init']);
            await execa('git', ['add', '.']);
            await execa('git', ['commit', '-m', `${store.getAutoCommitMessage()}`]);
            await execa('git', ['remote', 'add', 'origin', `${url}`]);
            await execa('git', ['branch', '-M', 'master']);
            await this.hold(2000);
            spinner.text = cyanB('pushing local repository to remote...');
            await execa('git', ['push', '-u', 'origin', 'master']);
            spinner.stop();
            return true;
         }
      } catch (error) {
         spinner.stop();
         throw new Error(error.message);
      }
      return true;
   },
   hold(ms) {
      return new Promise((resolve) => {
         setTimeout(() => {
            resolve(true);
         }, ms);
      });
   },
};
