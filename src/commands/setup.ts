import { addToken, addNewToken, noTokenStored } from '../main/token';
import catchAsync from '../utils/catchAsync';

export const runSetup = catchAsync(async () => {
   if (noTokenStored()) await addToken();
   else await addNewToken();
});
