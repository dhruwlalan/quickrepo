const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

module.exports = {
   // eg: path.basename('/Users/demo_path.js') --> demo_path.js
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
   isGitRepo(directory) {
      const fileObjs = fs.readdirSync(directory);
      let containsDotGitFile = false;
      fileObjs.forEach((file) => {
         if (file === '.git') {
            containsDotGitFile = true;
         }
      });
      return containsDotGitFile;
   },

   // check if the directory contains some content.
   containsContent(directory) {
      const fileObjs = fs.readdirSync(directory);
      return fileObjs.length > 0;
   },
};
