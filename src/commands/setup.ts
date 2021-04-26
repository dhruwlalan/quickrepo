// import token from './token';
import catchAsync from '../utils/catchAsync';
import { log } from '../utils/clogs';
import inquirer from '../utils/inquirer';
// import store from '../utils/store';

export default () =>
   catchAsync(async () => {
      const { addToken } = await inquirer.askAddToken();
      // const newUser = await token.displayVerifyToken(newToken);
      log.success(addToken);

      // if (newUser) {
      //    store.setToken(newToken);
      //    log.success('setup complete!');
      //    process.exit(0);
      // }
      // log.error('aborted setup!');
      // process.exit(1);
   });
