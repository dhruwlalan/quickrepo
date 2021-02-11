#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const github = require('./lib/github');
require('./lib/info');

program
   .command('init')
   .description('create repository')
   .action(async () => {
      try {
         const url = await github.createRemoteRepository();
         const res = await github.createLocalRepository(url);
         // const res = await github.createLocalRepository('haha');
         console.log(chalk.green.bold('Created repository successfully!'));
      } catch (error) {
         console.log(chalk.red.bold(error.message));
      }
   });

program
   .command('register')
   .description('register users personal access token')
   .action(async () => {
      const token = await github.setToken();
      if (token) {
         console.log(chalk.green.bold('Stored token successfully!'));
      } else {
         console.log(chalk.red.bold('Unable to store the token!'));
      }
   });

program
   .command('check')
   .description('check for a valid token')
   .action(async () => {
      const token = github.getToken();
      if (!token) {
         console.log('no token available, please register.');
      }
      const user = await github.checkToken(token);
      console.log(chalk.white.bold('token\t-> ') + chalk.blue.bold(token));
      console.log(chalk.white.bold('user\t-> ') + chalk.blue.bold(user.login));
      console.log(chalk.green.bold('The stored personal access token is valid!'));
   });

program.version('1.0.0', '-v, --version', 'output the current version');
program.parse(process.argv);
if (!program.args.length) {
   program.help();
}
