#!/usr/bin/env node

const { program } = require('commander');
require('./lib/info');
const { log } = require('./lib/clogs');
const setup = require('./lib/setup');
const config = require('./lib/config');
const token = require('./lib/token');
const github = require('./lib/github');

///setup///
program
   .command('setup')
   .description('initial basic app setup')
   .action(async () => {
      await setup.appSetup();
   });
program
   .command('reset')
   .description('reset app')
   .action(async () => {
      await config.resetConfig();
   });

///config///
program
   .command('view-config')
   .description('view all configs')
   .action(() => {
      config.viewConfig();
   });
program
   .command('edit-config')
   .description('edit app config')
   .action(async () => {
      setup.checkSetup();
      await config.editConfig();
   });

///token///
program
   .command('add-token')
   .description('add new github personal access token')
   .action(async () => {
      setup.checkSetup();
      await token.addNewToken();
   });
program
   .command('verify-token')
   .description('verify github personal access token')
   .action(async () => {
      setup.checkSetup();
      await token.getUserFromToken();
   });
program
   .command('view-token')
   .description('view your stored github personal access token')
   .action(async () => {
      setup.checkSetup();
      token.viewToken();
   });
program
   .command('delete-token')
   .description('view your stored github personal access token')
   .action(async () => {
      setup.checkSetup();
      await token.deleteToken();
   });

///repo///
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

///version///
program.version('1.0.0', '-v, --version', 'output the current version');
///help///
program.name('qr').usage('[options] [command]');
program.addHelpText('before', 'usage: quickrepo [options] [command]');
program.parse(process.argv);
if (!program.args.length) program.help();
