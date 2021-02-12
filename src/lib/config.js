const inquirer = require('./inquirer');
const store = require('./store');

module.exports = {
   async editConfig() {
      try {
         const answers = await inquirer.askEditConfig();
         if (answers.autoCommit !== 'no') {
            if (answers.autoCommit === 'yes') {
               store.setAutoCommit('yes');
            } else {
               store.setAutoCommit('ask each time');
            }
            store.setAutoCommitMessage(answers.autoCommitMessage);
         } else {
            store.setAutoCommit('no');
            store.setAutoCommitMessage(answers.autoCommitMessage);
         }
         return true;
      } catch (error) {
         return false;
      }
   },
   async resetConfig() {
      try {
         const { resetConfig } = await inquirer.askResetConfig();
         if (resetConfig) {
            store.clearConfig();
            return true;
         }
         return false;
      } catch (error) {
         return false;
      }
   },
};
