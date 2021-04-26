import { addToken } from './token';
import catchAsync from '../utils/catchAsync';
import { log } from '../utils/clogs';
// import inquirer from '../utils/inquirer';
import store from '../utils/store';

export const runSetup = catchAsync(async () => {
   if (store.getToken() === '') {
      const res = await addToken();
      if (res) {
         log.success('token added successfully!');
      } else {
         process.exit(1);
      }
   }
});
