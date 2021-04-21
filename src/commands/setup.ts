import token from './token';
import { log } from '../utils/clogs';
import inquirer from '../utils/inquirer';
import store from '../utils/store';
import info from '../utils/info';

export default {
   async runSetup() {
      try {
         if (info.ranSetup) {
            log.info('you have already ran the setup');
            const { rerunSetup } = await inquirer.askRerunSetup();
            if (!rerunSetup) process.exit(0);
         }
         const { newToken } = await inquirer.askAddNewToken();
         const newUser = await token.displayVerifyToken(newToken);
         if (newUser) {
            store.setToken(newToken);
            store.ranSetup(true);
            log.success('setup complete!');
            process.exit(0);
         }
         log.error('aborted setup!');
         process.exit(1);
      } catch (error) {
         console.log(error.message);
         process.exit(1);
      }
   },
   checkSetup() {
      if (!info.ranSetup) {
         log.warn('please run the setup first');
         log.hint('to setup your app you can run the below command:', 'setup');
         process.exit(1);
      }
   },
};
