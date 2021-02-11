#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const setup = require('./lib/setup');
const editConfig = require('./lib/editConfig');
const config = require('./lib/config');
const token = require('./lib/token');
const github = require('./lib/github');
const info = require('./lib/info');

// app setup
program
   .command('setup')
   .description('initial basic app setup')
   .action(async () => {
      try {
         if (info.ranSetup) {
            console.log(chalk.blue.bold('you have already ran the setup!'));
            const rerun = await setup.rerunSetup();
            if (rerun) {
               const res = await token.addToken();
               if (res) {
                  await editConfig.editConfig();
                  console.log(chalk.green.bold('✔ setup complete!'));
               } else {
                  console.log(chalk.red.bold('✖ aborting setup!'));
               }
            } else {
               console.log(chalk.red.bold('✖ discarding setup!'));
            }
         } else {
            const res = await token.addToken();
            if (res) {
               await editConfig.editConfig();
               console.log(chalk.green.bold('✔ setup complete!'));
            } else {
               console.log(chalk.red.bold('✖ aborting setup!'));
            }
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
         await editConfig.editConfig();
         console.log(chalk.green.bold('edited config successfully!'));
      } catch (error) {
         console.log(chalk.red.bold(error.message));
      }
   });

program
   .command('reset')
   .description('reset app config')
   .action(async () => {
      try {
         const res = await editConfig.clearConfig();
         if (res) {
            console.log(chalk.green.bold('✔ app reseted successfully!'));
         } else {
            console.log(chalk.red.bold('✖ discarded app reset!'));
         }
      } catch (error) {
         console.log(chalk.red.bold(error.message));
      }
   });

// token stuff
program
   .command('add-token')
   .description('add new github personal access token')
   .action(async () => {
      await token.addToken();
   });
program
   .command('verify-token')
   .description('verify github personal access token')
   .action(async () => {
      const user = await token.verifyToken();
      if (user) {
         console.log(chalk.green.bold('token is valid'));
      } else {
         console.log(chalk.red.bold('token is invalid'));
      }
   });
// repo stuff
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

// current versiion of app
program.version('1.0.0', '-v, --version', 'output the current version');
// display help
program.name('qr').usage('[options] [command]');
program.addHelpText('before', 'usage: quickrepo [options] [command]');
program.parse(process.argv);
if (!program.args.length) {
   program.help();
}
