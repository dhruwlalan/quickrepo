const inquirer = require('./inquirer');
const store = require('./store');

module.exports = {
   async appSetup() {
      const answers = await inquirer.askAppSetup();
      store.setToken(answers.token);
      if (answers.autoCommit !== 'no') {
         store.setAutoCommit(true);
         store.setAutoCommitMessage(answers.autoCommitMessage);
      } else {
         store.setAutoCommit(false);
         store.setAutoCommitMessage(answers.autoCommitMessage);
      }
      store.ranSetup(true);
   },
   async rerunSetup() {
      const answer = await inquirer.askRerunSetup();
      return answer.rerunSetup;
   },
};
