import './utils/info';

import { program } from 'commander';
import updateNotifier from 'update-notifier';

import { name, version } from '../package.json';
import { runSetup } from './commands/setup';
import { verifyStoredToken } from './commands/verify';
import { createRepo } from './commands/init';

///version///
updateNotifier({
   pkg: {
      name,
      version,
   },
   updateCheckInterval: 1000 * 60 * 60 * 24,
}).notify({
   isGlobal: true,
});
program.name('qr').usage('[option] [command]');
program.version(`${version}`, '-v, --version', 'output the current version');

///commands///
program
   .command('setup')
   .description('setup personal access token for the app')
   .action(() => runSetup());

program
   .command('verify')
   .description('verify the stored personal access token')
   .action(() => verifyStoredToken());

program
   .command('init')
   .description('create & host repository')
   .action(() => createRepo());

///help///
program.parse(process.argv);
if (!program.args.length) program.help();
