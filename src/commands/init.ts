import { noTokenStored } from '../main/token';
import { createRepository, isGitRepo } from '../main/repo';
import catchAsync from '../utils/catchAsync';
import { log } from '../utils/clogs';

export const createRepo = catchAsync(async () => {
   if (noTokenStored()) {
      log.warn('you dont have a token stored in the app');
      log.hint('to add a token, run the below command:', 'setup');
      process.exit(0);
   }

   if (isGitRepo()) process.exit(0);

   await createRepository();
});
