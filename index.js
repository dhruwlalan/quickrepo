#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const files = require('./lib/files');
const github = require('./lib/github');

program
   .command('init')
   .description('Draw app baner')
   .action(() => {
      // process.stdout.write('\u001B[2J\u001B[0;0f');
      console.log(chalk.cyanBright('quickrepo'));
   });

program
   .command('octocheck')
   .description('check github user credentials')
   .action(async () => {
      const token = github.getStoredGithubToken();
      if (!token) {
         const user = await github.registerToken();
         console.log(user);
      }
      console.log(token);
   });

program.version('1.0.0', '-v, --version', 'output the current version');
program.parse(process.argv);

if (!program.args.length) {
   program.help();
}
