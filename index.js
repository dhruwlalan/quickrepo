#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const files = require('./lib/files');
const github = require('./lib/github');

program
   .command('init')
   .description('create repository')
   .action(() => {});

program
   .command('register')
   .description('register users personal access token')
   .action(async () => {
      const token = await github.setToken();
      if (token) {
         console.log(chalk.green.bold('stored token successfully!'));
      } else {
         console.log(chalk.red.bold('unable to store token!'));
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
      console.log(chalk.green.bold('the stored token is valid!'));
   });

program.version('1.0.0', '-v, --version', 'output the current version');
program.parse(process.argv);
if (!program.args.length) {
   program.help();
}
