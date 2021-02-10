import { Octokit } from '@octokit/rest';
import ora from 'ora';

import { cyanB, log } from '../utils/clogs';
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

   if (!user) return false;

   return user;
}

export async function addToken(newToken = false): Promise<never> {
   const { token } = await inquirer.askAddToken(newToken);
   const user = await displayVerifyToken(token);
   if (user) {
      config.setToken(token);
      log.success('token is valid!');
      log.success('token added successfully!');
      process.exit(0);
   }
   log.error('token is invalid!');
   process.exit(0);
}

export async function addNewToken(): Promise<never> {
   const user = await displayVerifyToken(true);
   if (!user) await addToken();

   const { addNewToken } = await inquirer.askConfirmAddNewToken();
   if (!addNewToken) process.exit(0);

   await addToken(true);
   process.exit(0);
}
