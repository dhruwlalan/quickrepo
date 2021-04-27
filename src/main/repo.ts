import { Octokit } from '@octokit/rest';
import ora from 'ora';
import execa from 'execa';

import inquirer from '../main/inquirer';
import config from '../main/config';
import { verifyToken } from '../main/token';
import info from '../utils/info';
import hold from '../utils/hold';
import { log, cyanB } from '../utils/clogs';

export function isGitRepo() {
   if (info.isGitRepo) return true;
   return false;
}

export async function createOctokitInstance(): Promise<Octokit> {
   const spinner = ora(cyanB('verifying stored token...'));
   try {
      spinner.start();
      const user = await verifyToken(config.getToken());
      if (!user) throw new Error('invalid token');
      spinner.stop();
      return user.instance;
   } catch (e) {
      spinner.stop();
      log.error('your stored token has become invalid, try adding a new one');
      log.hint('to add a token you can run the below command:', 'add-token');
      process.exit(1);
   }
}

export async function createRemoteRepository() {
   const spinner = ora(cyanB('creating remote repository...'));
   try {
      const octokit = await createOctokitInstance();
      const answers = await inquirer.askRemoteRepositoryDetails();

      spinner.start();
      const { data } = await octokit.repos.createForAuthenticatedUser({
         name: answers.name,
         description: answers.description,
         private: answers.visibility === 'private',
      });
      spinner.stop();

      return data.ssh_url;
   } catch (error) {
      spinner.stop();
      if (error.status === 422) {
         log.error(`unable to create repository: name already exists!`);
      } else {
         log.error(`error code: ${error.status}`);
         log.error(error.message);
      }
      process.exit(1);
   }
}

export async function createLocalRepository(url: string) {
   const spinner = ora(cyanB('creating local repository...'));
   try {
      spinner.start();
      await execa('git', ['init']);
      await execa('git', ['remote', 'add', 'origin', `${url}`]);
      await hold(1000);
      spinner.stop();
      return true;
   } catch (error) {
      spinner.stop();
      log.error(`error code: ${error.status}`);
      log.error(error.message);
      process.exit(1);
   }
}

export async function pushLocalRepositoryToRemote(commitMsg: string) {
   const spinner = ora(cyanB('pushing local repository to remote...'));
   try {
      spinner.start();
      await execa('git', ['add', '.']);
      await execa('git', ['commit', '-m', `${commitMsg}`]);
      await execa('git', ['branch', '-M', 'master']);
      await execa('git', ['push', '-u', 'origin', 'master']);
      spinner.stop();

      return true;
   } catch (error) {
      spinner.stop();
      log.error(`error code: ${error.status}`);
      log.error(error.message);
      process.exit(1);
   }
}

export async function createRepository() {
   const sshUrl = await createRemoteRepository();

   if (!info.containsContent) {
      await createLocalRepository(sshUrl);
      log.success('created repository successfully!');
      process.exit(0);
   }

   const { initialCommit } = await inquirer.askToCreateInitialCommit();
   if (!initialCommit) {
      await createLocalRepository(sshUrl);
      log.success('created repository successfully!');
      process.exit(0);
   }

   const { initialCommitMessage } = await inquirer.askInitialCommitMessage();
   await createLocalRepository(sshUrl);
   await pushLocalRepositoryToRemote(initialCommitMessage);

   process.exit(0);
}
