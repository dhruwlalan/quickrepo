import { Octokit } from '@octokit/rest';
import ora from 'ora';

// import { whiteB, blueB, greenB, cyanB, log } from '../utils/clogs';
import { cyanB, log } from '../utils/clogs';
import inquirer from '../utils/inquirer';
import store from '../utils/store';

interface User {
   username: string;
   githubUrl: string;
}

export async function addToken(): Promise<boolean> {
   const { addToken } = await inquirer.askAddToken();
   const user = await displayVerifyToken(addToken);
   if (user) {
      store.setToken(addToken);
      return true;
   }
   return false;
}

// try {
//       const spinner = ora(cyanB('checking stored token...')).start();
//       const oldUser = await this.verifyToken(store.getToken());
//       spinner.stop();
//       if (oldUser && oldUser !== 'not-stored') {
//          log.warn(
//             'you already have a valid stored token, adding a new one would replace it',
//          );
//          const { confirmNewToken } = await inquirer.askConfirmNewToken();
//          if (!confirmNewToken) {
//             process.exit(0);
//          }
//       }
//       const { newToken } = await inquirer.askAddNewToken();
//       const newUser = await this.displayVerifyToken(newToken);
//       if (newUser) {
//          store.setToken(newToken);
//          log.success('token added successfully!');
//       }
//       process.exit(0);
//    } catch (error) {
//       console.log(error.message);
//       process.exit(1);
//    }

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

export async function displayVerifyToken(token: string): Promise<User | false> {
   const spinner = ora(cyanB('verifying Token...')).start();
   const user = await verifyToken(token);
   spinner.stop();
   if (user) {
      log.success('token is valid!');
      return user;
   }
   log.error('token is invalid!');
   return false;
}

export default {
   // async getUserFromToken() {
   //    try {
   //       const user = await this.displayVerifyToken(store.getToken());
   //       if (user) {
   //          console.log(
   //             `${blueB('username')}${whiteB(':')} ${cyanB(user.login)}`,
   //          );
   //          console.log(
   //             `${blueB('github-url')}${whiteB(':')} ${cyanB(user.html_url)}`,
   //          );
   //          process.exit(0);
   //       } else {
   //          log.warn('the stored token has become invalid');
   //          log.info('kindly add a valid new token');
   //          log.hint(
   //             'to add a new token you can run the below command:',
   //             'add-token',
   //          );
   //          process.exit(1);
   //       }
   //    } catch (error) {
   //       console.log(error.message);
   //       process.exit(1);
   //    }
   // },
};
