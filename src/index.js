#!/usr/bin/env node

const { program } = require('commander');
const { white, red, green, yellowBright, cyan, blue, bold } = require('colorette');
const setup = require('./lib/setup');
const store = require('./lib/store');
const config = require('./lib/config');
const token = require('./lib/token');
const github = require('./lib/github');
const info = require('./lib/info');

///app setup///
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

///app config///
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
      setup.checkSetup();
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

///token stuff///
program
   .command('add-token')
   .description('add new github personal access token')
   .action(async () => {
      setup.checkSetup();
      console.log(bold(white('checking stored token...')));
      const user = await token.verifyToken(store.getToken());
      if (user) {
         console.log(
            yellowBright(
               '⚠ you already have a valid stored token, adding a new one would replace it.',
            ),
         );
         const confirm = await token.confirmNewToken();
         if (confirm) {
            const res = await token.addNewToken();
            if (res) {
               console.log(bold(green('✔ token added successfully!')));
            } else {
               console.log(bold(red('✖ unable to add token!')));
            }
         }
      } else {
         const res = await token.addNewToken();
         if (res) {
            console.log(bold(green('✔ token added successfully!')));
         } else {
            console.log(bold(red('✖ unable to add token!')));
         }
      }
   });
program
   .command('verify-token')
   .description('verify github personal access token')
   .action(async () => {
      setup.checkSetup();
      const user = await token.verifyToken(store.getToken());
      if (user) {
         console.log(`${bold(blue('username'))} ${bold(white('—→'))} ${bold(cyan(user.login))}`);
         console.log(
            `${bold(blue('github-url'))} ${bold(white('—→'))} ${bold(cyan(user.html_url))}`,
         );
      }
   });
program
   .command('view-token')
   .description('view your stored github personal access token')
   .action(async () => {
      setup.checkSetup();
      const storedToken = store.getToken();
      console.log(`${bold(cyan('token'))} ${bold(white('—→'))} ${bold(green(storedToken))}`);
   });

///repo stuff///
program
   .command('init')
   .description('create repository')
   .action(async () => {
      try {
         setup.checkSetup();
         const url = await github.createRemoteRepository();
         const res = await github.createLocalRepository(url);
         // const res = await github.createLocalRepository('haha');
         console.log(bold(green('Created repository successfully!')));
      } catch (error) {
         console.log(bold(red(error.message)));
      }
   });

///version & help///
program.version('1.0.0', '-v, --version', 'output the current version');
program.name('qr').usage('[options] [command]');
program.addHelpText('before', 'usage: quickrepo [options] [command]');
program.parse(process.argv);
if (!program.args.length) {
   program.help();
}
