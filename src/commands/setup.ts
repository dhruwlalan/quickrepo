import { addToken, addNewToken } from '../main/token';
import config from '../main/config';
import catchAsync from '../utils/catchAsync';

export const runSetup = catchAsync(async () => {
   if (config.getToken() === '') await addToken();
   else await addNewToken();
});
