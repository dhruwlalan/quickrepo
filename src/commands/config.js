const inquirer = require('../utils/inquirer');
const store = require('../utils/store');
const info = require('../utils/info');
const { whiteB, greenB, cyanB, log } = require('../utils/clogs');

module.exports = {
   viewConfig() {
      const configs = Object.entries(store.getConfig());
      configs.forEach((config) => {
         if (config[0] !== 'ranSetup' && config[0] !== 'token') {
            if (config[0] === 'autoCommitMessage' && store.getAutoCommit() === 'never') {
               return;
            }
            console.log(`${cyanB(config[0])}${whiteB(':')} ${greenB(config[1])}`);
         }
      });
      process.exit(0);
   },
   async editConfig() {
      try {
         const { autoCommit, autoCommitMessage, hints } = await inquirer.askEditConfig();
         store.setHints(hints);
         if (autoCommit !== 'never') {
            if (autoCommit === 'always') {
               store.setAutoCommit('always');
            } else {
               store.setAutoCommit('ask each time');
            }
            store.setAutoCommitMessage(autoCommitMessage);
            log.success('edited config successfully!');
         } else {
            store.setAutoCommit('never');
            store.setAutoCommitMessage(autoCommitMessage);
            log.success('edited config successfully!');
         }
         process.exit(0);
      } catch (error) {
         console.log(error.message);
         process.exit(1);
      }
   },
   async resetConfig() {
      try {
         if (info.ranSetup) {
            log.warn('reseting app will clear your stored token & your configs');
            const { resetConfig } = await inquirer.askResetConfig();
            if (resetConfig) {
               store.clearConfig();
               log.success('app reseted successfully!');
            }
            process.exit(0);
         }
         log.info('your app has never been setted up!');
         log.hint('if you want to setup your app, run the below command:', 'setup');
         process.exit(0);
      } catch (error) {
         console.log(error.message);
         process.exit(1);
      }
   },
};
