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
            const { autoCommit, autoCommitMessage } = await inquirer.askEditConfig();
            if (autoCommit !== 'no') {
               if (autoCommit === 'yes') {
                  store.setAutoCommit('yes');
               } else {
                  store.setAutoCommit('ask each time');
               }
               store.setAutoCommitMessage(autoCommitMessage);
            } else {
               store.setAutoCommit('no');
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
         log.hint('to run the setup you can use either of the two commands:', 'setup');
         process.exit();
      }
   },
};
