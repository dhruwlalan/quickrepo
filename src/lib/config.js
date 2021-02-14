const inquirer = require('./inquirer');
const store = require('./store');
const info = require('./info');
const { whiteB, greenB, cyanB, log } = require('./clogs');

module.exports = {
   viewConfig() {
      const allConfigs = Object.entries(store.viewConfig());
      allConfigs.forEach((conf) => {
         if (conf[0] !== 'ranSetup' && conf[0] !== 'token') {
            if (conf[0] === 'autoCommitMessage' && store.getAutoCommit() === 'never') {
               return;
            }
            console.log(`${cyanB(conf[0])} ${whiteB('—→')} ${greenB(conf[1])}`);
         }
      });
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
         process.exit();
      } catch (error) {
         console.log(error.message);
         process.exit();
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
            process.exit();
         }
         log.info('your app is already in its default state!');
         log.hint('if you want to setup your app, run any one of the below two commands:', 'setup');
         process.exit();
      } catch (error) {
         console.log(error.message);
         process.exit();
      }
   },
};
