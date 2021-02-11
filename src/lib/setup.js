const inquirer = require('./inquirer');
const config = require('./config');

module.exports = {
   async appSetup() {
      const answers = await inquirer.askAppSetup();
      config.setToken(answers.token);
      if (answers.autoCommit !== 'no') {
         config.setAutoCommit(true);
         config.setAutoCommitMessage(answers.autoCommitMessage);
      } else {
         config.setAutoCommit(false);
         config.setAutoCommitMessage(answers.autoCommitMessage);
      }
      config.ranSetup(true);
   },
   async rerunSetup() {
      const answer = await inquirer.askRerunSetup();
      return answer.rerunSetup;
   },
};
