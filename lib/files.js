const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

module.exports = {
   // path.basename('/Users/demo_path.js') => demo_path.js
   getCurrentDirectoryBase() {
      return path.basename(process.cwd());
   },

   // check the path and return true if it is a directory else fales.
   isDirectory(filePath) {
      try {
         return fs.statSync(filePath).isDirectory();
      } catch (error) {
         return false;
      }
   },

   // check wether the current directory is already a git repository.
   isGitRepo(files) {
      if (files.isDirectory('.git')) {
         console.log(chalk.red('This directory is already a git repository!'));
         process.exit();
      }
   },
};
