const inquirer = require('./inquirer');
const config = require('./config');
const { clearConfig } = require('./config');

module.exports = {
   async editConfig() {
      const answers = await inquirer.askEditConfig();
      if (answers.autoCommit !== 'no') {
         config.setAutoCommit(true);
         config.setAutoCommitMessage(answers.autoCommitMessage);
      } else {
         config.setAutoCommit(false);
         config.setAutoCommitMessage(answers.autoCommitMessage);
      }
      config.ranSetup(true);
   },
   async clearConfig() {
      const answer = await inquirer.askClearConfig();
      config.clearConfig();
      return answer.clearConfig;
   },
};
