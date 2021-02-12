#!/usr/bin/env node

const { program } = require('commander');
const { white, red, green, yellowBright, cyan, bold } = require('colorette');
const setup = require('./lib/setup');
const store = require('./lib/store');
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
            console.log(yellowBright('⚠ you have already ran the setup.'));
            const rerun = await setup.rerunSetup();
            if (rerun) {
               const res = await token.addToken();
               if (res) {
                  await config.editConfig();
                  store.ranSetup(true);
                  console.log(bold(green('✔ setup complete!')));
               } else {
                  console.log(bold(red('✖ aborted setup!')));
               }
            } else {
               console.log(bold(red('✖ discarded setup!')));
            }
         } else {
            const res = await token.addToken();
            if (res) {
               await config.editConfig();
               store.ranSetup(true);
               console.log(bold(green('✔ setup complete!')));
            } else {
               console.log(bold(red('✖ aborted setup!')));
            }
         }
      } catch (error) {
         console.log(bold(red(error.message)));
      }
   });

// app config
program
   .command('view-config')
   .description('view all configs')
   .action(async () => {
      const allConfigs = Object.entries(store.viewConfig());
      allConfigs.forEach((conf) => {
         // if (conf[0] !== 'ranSetup') {
         console.log(`${bold(cyan(conf[0]))} ${bold(white('—→'))} ${bold(green(conf[1]))}`);
         // }
      });
   });
program
   .command('edit-config')
   .description('edit app config')
   .action(async () => {
      const res = await config.editConfig();
      if (res) {
         console.log(bold(green('✔ edited config successfully!')));
      } else {
         console.log(bold(red('✖ unable to edit config!')));
      }
   });
program
   .command('reset-config')
   .description('reset app config')
   .action(async () => {
      const res = await config.resetConfig();
      if (res) {
         console.log(bold(green('✔ config reseted successfully!')));
      } else {
         console.log(bold(red('✖ discarded config reset!')));
      }
   });

// token stuff
program
   .command('add-token')
   .description('add new github personal access token')
   .action(async () => {
      // if (!info.ranSetup) {
      //    console.log(chalk.yellow('⚠ please run the setup first!'));
      //    console.log(chalk.white.bold('to run the setup you can use either of the two commands:'));
      //    console.log(chalk.cyan.bold('$ qr setup\n$ quickrepo setup'));
      //    process.exit();
      // }
      setup.checkSetup();
      const res = await token.addToken();
      if (res) {
         console.log(bold(green('✔ token added successfully!')));
      } else {
         console.log(bold(red('✖ unable to add token!')));
      }
   });
program
   .command('verify-token')
   .description('verify github personal access token')
   .action(async () => {
      const user = await token.verifyToken(store.getToken());
      if (user) {
         console.log(`${bold(cyan('username'))} ${bold(white('—→'))} ${bold(green(user.login))}`);
         console.log(
            `${bold(cyan('github-url'))} ${bold(white('—→'))} ${bold(cyan('github-url'))}`,
         );
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
         console.log(bold(green('Created repository successfully!')));
      } catch (error) {
         console.log(bold(red(error.message)));
      }
   });

// version & help
program.version('1.0.0', '-v, --version', 'output the current version');
program.name('qr').usage('[options] [command]');
program.addHelpText('before', 'usage: quickrepo [options] [command]');
program.parse(process.argv);
if (!program.args.length) {
   program.help();
}
