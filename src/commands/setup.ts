import { addToken, noTokenStored } from '../main/token';
import catchAsync from '../utils/catchAsync';
import { log } from '../utils/clogs';

export const runSetup = catchAsync(async () => {
   let added = false;
   if (noTokenStored()) added = await addToken();
   else added = await addToken(true);

   if (added) {
      log.success('token is valid!');
      log.success('token added successfully!');
      process.exit(0);
   }

   log.error('token is invalid!');
   process.exit(0);
});
