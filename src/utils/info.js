const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const store = require('./store');

const cwd = process.cwd();
const code = shell.exec('git rev-parse --is-inside-work-tree', { silent: true }).code;
const fileObjs = fs.readdirSync(cwd);

module.exports = {
   ranSetup: store.ranSetup(),
   directoryBase: path.basename(cwd),
   isGitRepo: code === 0,
   containsContent: fileObjs.length > 0,
};
