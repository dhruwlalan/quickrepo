const inquirer = require('./inquirer');
const config = require('./config');

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
};
