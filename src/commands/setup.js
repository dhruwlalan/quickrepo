const token = require('./token');
const { log } = require('../utils/clogs');
const inquirer = require('../utils/inquirer');
const store = require('../utils/store');
const info = require('../utils/info');

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
