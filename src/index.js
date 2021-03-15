require('./utils/info');

const { program } = require('commander');
const updateNotifier = require('update-notifier');

const { name, version } = require('../package.json');
const setup = require('./commands/setup');
const config = require('./commands/config');
const token = require('./commands/token');
const repo = require('./commands/repo');

///version///
updateNotifier({
   pkg: {
      name,
      version,
   },
   updateCheckInterval: 1000 * 60 * 60 * 24,
}).notify({ isGlobal: true });
program.version(`${version}`, '-v, --version', 'output the current version');

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
      setup.checkSetup();
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
   .description('add a new github personal access token')
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
   .description('delete your stored github personal access token')
   .action(async () => {
      setup.checkSetup();
      await token.deleteToken();
   });

///repo///
program
   .command('init')
   .description('create & host repository')
   .action(async () => {
      setup.checkSetup();
      await repo.createRepository();
   });

///help///
program.name('qr').usage('[options] [command]');
program.parse(process.argv);
if (!program.args.length) program.help();
