const inquirer = require('./inquirer');
const store = require('./store');

module.exports = {
   async editConfig() {
      try {
         const answers = await inquirer.askEditConfig();
         if (answers.autoCommit !== 'no') {
            store.setAutoCommit(true);
            store.setAutoCommitMessage(answers.autoCommitMessage);
         } else {
            store.setAutoCommit(false);
            store.setAutoCommitMessage(answers.autoCommitMessage);
         }
         return true;
      } catch (error) {
         return false;
      }
   },
   async resetConfig() {
      try {
         const answer = await inquirer.askResetConfig();
         store.clearConfig();
         return answer.resetConfig;
      } catch (error) {
         return false;
      }
   },
};
