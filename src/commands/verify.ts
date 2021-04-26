import { displayVerifyStoredToken } from '../main/token';
import config from '../main/config';
import catchAsync from '../utils/catchAsync';
import { blueB, cyanB, log, whiteB } from '../utils/clogs';

export const verifyStoredToken = catchAsync(async () => {
   if (config.getToken() === '') {
      log.warn('there is no stored token to verify');
      log.hint('to add a new token, run the below command:', 'setup');
      process.exit(0);
   }

   const user = await displayVerifyStoredToken();
   if (!user) {
      log.info('kindly add a valid new token');
      log.hint('to add a new token, run the below command:', 'setup');
      process.exit(0);
   }

   console.log(`${blueB('username')}${whiteB(':')} ${cyanB(user.username)}`);
   console.log(`${blueB('github-url')}${whiteB(':')} ${cyanB(user.githubUrl)}`);
   process.exit(0);
});
