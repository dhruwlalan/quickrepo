import { Octokit } from '@octokit/rest';
import ora from 'ora';

import { cyanB, log } from '../utils/clogs';
import inquirer from './inquirer';
import config from './config';

interface User {
   username: string;
   githubUrl: string;
}

export function noTokenStored() {
   if (config.getToken() !== '') return false;
   return true;
}

export async function verifyToken(token: string): Promise<User | false> {
   try {
      const octokit = new Octokit({ auth: token });
      const { data } = await octokit.request('/user');
      if (data) return { username: data.login, githubUrl: data.html_url };
      return false;
   } catch (error) {
      return false;
   }
}

export async function addToken(newToken = false): Promise<void> {
   const { token } = await inquirer.askAddToken(newToken);
   const user = await displayVerifyToken(token);
   if (user) {
      config.setToken(token);
      log.success('token added successfully!');
      process.exit(0);
   }
   process.exit(1);
}
export async function displayVerifyToken(token: string): Promise<User | false> {
   const spinner = ora(cyanB('verifying token...')).start();
   const user = await verifyToken(token);
   spinner.stop();
   if (user) {
      log.success('token is valid!');
      return user;
   }
   log.error('token is invalid!');
   return false;
}

export async function addNewToken(): Promise<void> {
   const user = await displayVerifyStoredToken();
   if (!user) await addToken(true);
   else {
      const { addNewToken } = await inquirer.askConfirmAddNewToken();
      if (!addNewToken) process.exit(0);
      await addToken(true);
   }
}
export async function displayVerifyStoredToken(): Promise<User | false> {
   const spinner = ora(cyanB('verifying stored token...')).start();
   const user = await verifyToken(config.getToken());
   spinner.stop();
   if (user) {
      log.success('stored token is valid!');
      return user;
   }
   log.error('stored token has become invalid!');
   return false;
}
