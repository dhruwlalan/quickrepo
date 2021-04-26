import './utils/info';

import { program } from 'commander';
import updateNotifier from 'update-notifier';

import { name, version } from '../package.json';
import runSetup from './commands/setup';
// import repo from './commands/repo';

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
program.version(`${version}`, '-v, --version', 'output the current version');

///setup///
program
   .command('setup')
   .description('initial basic app setup')
   .action(() => runSetup());

///repo///
// program
//    .command('init')
//    .description('create & host repository')
//    .action(async () => {
//       setup.checkSetup();
//       await repo.createRepository();
//    });

///help///
program.name('qr').usage('[option] [command]');
program.parse(process.argv);
if (!program.args.length) program.help();
