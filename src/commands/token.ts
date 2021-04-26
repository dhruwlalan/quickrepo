export {};
// import { Octokit } from '@octokit/rest';
// import ora from 'ora';
// import { whiteB, blueB, greenB, cyanB, log } from '../utils/clogs';
// import inquirer from '../utils/inquirer';
// import store from '../utils/store';

// export default {
//    viewToken() {
//       const storedToken = store.getToken();
//       if (!storedToken) {
//          log.warn('you dont have a token stored in the app');
//          log.hint('to add a token you can run the below command:', 'add-token');
//          process.exit(1);
//       }
//       console.log(`${cyanB('token')}${whiteB(':')} ${greenB(storedToken)}`);
//       process.exit(0);
//    },
//    async addNewToken() {
//       try {
//          const spinner = ora(cyanB('checking stored token...')).start();
//          const oldUser = await this.verifyToken(store.getToken());
//          spinner.stop();
//          if (oldUser && oldUser !== 'not-stored') {
//             log.warn(
//                'you already have a valid stored token, adding a new one would replace it',
//             );
//             const { confirmNewToken } = await inquirer.askConfirmNewToken();
//             if (!confirmNewToken) {
//                process.exit(0);
//             }
//          }
//          const { newToken } = await inquirer.askAddNewToken();
//          const newUser = await this.displayVerifyToken(newToken);
//          if (newUser) {
//             store.setToken(newToken);
//             log.success('token added successfully!');
//          }
//          process.exit(0);
//       } catch (error) {
//          console.log(error.message);
//          process.exit(1);
//       }
//    },
//    async deleteToken() {
//       try {
//          const spinner = ora(cyanB('checking stored token...')).start();
//          const user = await this.verifyToken(store.getToken());
//          spinner.stop();

//          if (user === 'not-stored') {
//             log.warn('you dont have a token stored in the app to delete');
//             process.exit(1);
//          } else if (user && user !== 'not-stored') {
//             log.warn('you already have a valid stored token');
//          } else {
//             log.info('your stored token has become invalid, better delete it');
//          }

//          const { deleteToken } = await inquirer.askDeleteToken();
//          if (deleteToken) {
//             store.setToken(null);
//             log.success('token deleted successfully!');
//          }
//          process.exit(0);
//       } catch (error) {
//          console.log(error.message);
//          process.exit(1);
//       }
//    },
//    async getUserFromToken() {
//       try {
//          const user = await this.displayVerifyToken(store.getToken());
//          if (user) {
//             console.log(
//                `${blueB('username')}${whiteB(':')} ${cyanB(user.login)}`,
//             );
//             console.log(
//                `${blueB('github-url')}${whiteB(':')} ${cyanB(user.html_url)}`,
//             );
//             process.exit(0);
//          } else {
//             log.warn('the stored token has become invalid');
//             log.info('kindly add a valid new token');
//             log.hint(
//                'to add a new token you can run the below command:',
//                'add-token',
//             );
//             process.exit(1);
//          }
//       } catch (error) {
//          console.log(error.message);
//          process.exit(1);
//       }
//    },
//    async displayVerifyToken(token: any) {
//       if (!token) {
//          log.warn('you dont have a token stored in the app');
//          log.hint(
//             'to add a new token you can run the below command:',
//             'add-token',
//          );
//          process.exit(1);
//       }
//       const spinner = ora(cyanB('verifying Token...')).start();
//       const user = await this.verifyToken(token);
//       if (user) {
//          spinner.stop();
//          log.success('token is valid!');
//          return user;
//       }
//       spinner.stop();
//       log.error('token is invalid!');
//       return false;
//    },
//    async verifyToken(token: any) {
//       if (!token) {
//          return 'not-stored';
//       }
//       try {
//          const octokit = new Octokit({
//             auth: token,
//          });
//          const { data } = await octokit.request('/user');
//          if (data) {
//             return data;
//          }
//          return false;
//       } catch (error) {
//          return false;
//       }
//    },
// };
