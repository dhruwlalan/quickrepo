#!/usr/bin/env node

const { program } = require('commander');
const setup = require('./lib/setup');
const store = require('./lib/store');
const config = require('./lib/config');
const token = require('./lib/token');
const github = require('./lib/github');
const info = require('./lib/info');
const { whiteB, redB, blueB, greenB, cyanB, log } = require('./lib/clogs');

///app setup///
program
   .command('setup')
   .description('initial basic app setup')
   .action(async () => {
      try {
         if (info.ranSetup) {
            log.warn('you have already ran the setup');
            const rerun = await setup.rerunSetup();
            if (rerun) {
               const res = await token.addNewToken();
               if (res) {
                  await config.editConfig();
                  store.ranSetup(true);
                  log.success('setup complete!');
               } else {
                  log.error('aborted setup!');
               }
            }
         } else {
            const res = await token.addNewToken();
            if (res) {
               await config.editConfig();
               store.ranSetup(true);
               log.success('setup complete!');
            } else {
               log.error('aborted setup!');
            }
         }
      } catch (error) {
         console.log(redB(error.message));
      }
   });
program
   .command('reset')
   .description('reset app')
   .action(async () => {
      if (info.ranSetup) {
         log.warn('reseting app will clear your stored token & your configs');
         const res = await config.resetConfig();
         if (res) {
            log.success('app reseted successfully!');
         }
      } else {
         log.info('your app is already in its default state!');
         log.hint('if you want to setup your app, run any one of the below two commands:', 'setup');
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
         console.log(`${cyanB(conf[0])} ${whiteB('—→')} ${greenB(conf[1])}`);
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
         log.success('edited config successfully!');
      } else {
         log.error('unable to edit config!');
      }
   });

///token stuff///
program
   .command('add-token')
   .description('add new github personal access token')
   .action(async () => {
      setup.checkSetup();
      const user = await token.verifyToken(store.getToken());
      if (user && user !== 'not-stored') {
         log.warn('you already have a valid stored token, adding a new one would replace it');
         const confirm = await token.confirmNewToken();
         if (confirm) {
            const res = await token.addNewToken();
            if (res) {
               log.success('token added successfully!');
            } else {
               log.error('unable to add token!');
            }
         }
      } else {
         const res = await token.addNewToken();
         if (res) {
            log.success('token added successfully!');
         } else {
            log.error('unable to add token!');
         }
      }
   });
program
   .command('verify-token')
   .description('verify github personal access token')
   .action(async () => {
      setup.checkSetup();
      const user = await token.displayVerifyToken(store.getToken());
      if (user) {
         console.log(`${blueB('username')} ${whiteB('—→')} ${cyanB(user.login)}`);
         console.log(`${blueB('github-url')} ${whiteB('—→')} ${cyanB(user.html_url)}`);
      } else {
         log.warn('the stored token has become invalid');
         log.info('kindly add a valid new token');
         log.hint('to add a new token you can run either of the below two commands:', 'add-token');
      }
   });
program
   .command('view-token')
   .description('view your stored github personal access token')
   .action(async () => {
      setup.checkSetup();
      const storedToken = store.getToken();
      if (!storedToken) {
         log.warn('you dont have a token stored in the app');
         log.hint('to add a token you can run either of the below two commands:', 'add-token');
      } else {
         console.log(`${cyanB('token')} ${whiteB('—→')} ${greenB(storedToken)}`);
      }
   });
program
   .command('delete-token')
   .description('view your stored github personal access token')
   .action(async () => {
      setup.checkSetup();
      const res = await token.deleteToken();
      if (res) {
         log.success('token deleted successfully!');
      }
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
         log.success('created repository successfully!');
      } catch (e) {
         log.error(e.message);
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
