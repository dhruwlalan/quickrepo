const { log } = require('./clogs');
const inquirer = require('./inquirer');
const store = require('./store');
const info = require('./info');
const token = require('./token');

module.exports = {
   async appSetup() {
      try {
         if (info.ranSetup) {
            log.info('you have already ran the setup');
            const { rerunSetup } = await inquirer.askRerunSetup();
            if (!rerunSetup) process.exit();
         }
         const { newToken } = await inquirer.askAddNewToken();
         const newUser = await token.displayVerifyToken(newToken);
         if (newUser) {
            store.setToken(newToken);
            const { autoCommit, autoCommitMessage, hints } = await inquirer.askEditConfig();
            store.setHints(hints);
            if (autoCommit !== 'never') {
               if (autoCommit === 'always') {
                  store.setAutoCommit('always');
               } else {
                  store.setAutoCommit('ask each time');
               }
               store.setAutoCommitMessage(autoCommitMessage);
            } else {
               store.setAutoCommit('never');
               store.setAutoCommitMessage(autoCommitMessage);
            }
            store.ranSetup(true);
            log.success('setup complete!');
            process.exit();
         }
         log.error('aborted setup!');
         process.exit();
      } catch (error) {
         console.log(error.message);
         process.exit();
      }
   },
   checkSetup() {
      if (!info.ranSetup) {
         log.warn('please run the setup first');
         log.hint('to setup your app you can run the below command:', 'setup');
         process.exit();
      }
   },
};
