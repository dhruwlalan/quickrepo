const { whiteBright, yellowBright, cyanBright } = require('colorette');
const inquirer = require('./inquirer');
const store = require('./store');
const info = require('./info');

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
   checkSetup() {
      if (!info.ranSetup) {
         console.log(yellowBright('⚠ please run the setup first.'));
         console.log(whiteBright('to run the setup you can use either of the two commands:'));
         console.log(cyanBright('$ qr setup\n$ quickrepo setup'));
         process.exit();
      }
   },
};
