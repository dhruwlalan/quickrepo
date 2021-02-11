#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const github = require('./lib/github');
const config = require('./lib/config');
const setup = require('./lib/setup');
const info = require('./lib/info');

// setup quickrepo, will run only once until re-runed
program
   .command('setup')
   .description('initial basic app setup')
   .action(async () => {
      try {
         if (info.ranSetup) {
            console.log(chalk.blue.bold('you have already ran the setup!'));
            const rerun = await setup.rerunSetup();
            if (rerun) {
               await setup.appSetup();
               console.log(chalk.green.bold('setup complete!'));
            }
         } else {
            await setup.appSetup();
            console.log(chalk.green.bold('setup complete!'));
         }
      } catch (error) {
         console.log(chalk.red.bold(error.message));
      }
   });
// app config
program
   .command('view-config')
   .description('view all configs')
   .action(async () => {
      try {
         const allConfigs = Object.entries(config.viewConfig());
         allConfigs.forEach((conf) => {
            // if (conf[0] !== 'ranSetup') {
            const key = chalk.cyan.bold(conf[0]);
            const value = chalk.green.bold(conf[1]);
            const seperator = chalk.white.bold('—→');
            console.log(`${key} ${seperator} ${value}`);
            // }
         });
      } catch (error) {
         console.log(chalk.red.bold(error.message));
      }
   });
program
   .command('edit-config')
   .description('edit app config')
   .action(async () => {
      try {
         await config.editConfig();
         console.log(chalk.green.bold('edited config successfully!'));
      } catch (error) {
         console.log(chalk.red.bold(error.message));
      }
   });
// github personal access token
program
   .command('add-token')
   .description('add new github personal access token')
   .action(async () => {
      const token = await github.addToken();
      if (token) {
         console.log(chalk.green.bold('new token added successfully!'));
      } else {
         console.log(chalk.red.bold('unable to add the token!'));
      }
   });
// create repository
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

// check for a valid token
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

// current versiion of app
program.version('1.0.0', '-v, --version', 'output the current version');
// display help
program.name('qr').usage('[options] [command]');
program.addHelpText('before', 'usage: quickrepo [options] [command]');
program.parse(process.argv);
if (!program.args.length) {
   program.help();
}
