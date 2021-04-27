import { Octokit } from '@octokit/rest';
import ora from 'ora';

import { cyanB } from '../utils/clogs';
import inquirer from './inquirer';
import config from './config';

interface User {
   username: string;
   githubUrl: string;
   instance: Octokit;
}

export function noTokenStored() {
   if (config.getToken() !== '') return false;
   return true;
}

export async function verifyToken(token: string): Promise<User | false> {
   try {
      const octokit = new Octokit({ auth: token });
      const { data } = await octokit.request('/user');

      if (!data) return false;

      return {
         username: data.login,
         githubUrl: data.html_url,
         instance: octokit,
      };
   } catch (error) {
      return false;
   }
}

export async function displayVerifyToken(
   token: string | true,
): Promise<User | false> {
   const spinner = ora();
   let user: User | false;

   if (typeof token === 'string') {
      spinner.start(cyanB('verifying token...'));
      user = await verifyToken(token);
   } else {
      spinner.start(cyanB('verifying stored token...'));
      user = await verifyToken(config.getToken());
   }
   spinner.stop();

   if (user) return user;
   return false;
}

export async function addToken(newToken = false): Promise<boolean> {
   if (!newToken) {
      const { token } = await inquirer.askAddToken();
      const user = await displayVerifyToken(token);
      if (!user) return false;
      config.setToken(token);
      return true;
   }

   const user = await displayVerifyToken(true);
   if (!user) {
      const { token } = await inquirer.askAddToken();
      const user = await displayVerifyToken(token);
      if (!user) return false;
      config.setToken(token);
      return true;
   }

   const { addNewToken } = await inquirer.askConfirmAddNewToken();
   if (!addNewToken) process.exit(0);

   const { token } = await inquirer.askAddToken(true);
   const newUser = await displayVerifyToken(token);
   if (!newUser) return false;
   config.setToken(token);
   return true;
}
