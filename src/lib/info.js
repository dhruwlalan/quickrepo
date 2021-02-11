const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const config = require('./config');

const cwd = process.cwd();
const code = shell.exec('git rev-parse --is-inside-work-tree', { silent: true }).code;
const fileObjs = fs.readdirSync(cwd);

module.exports = {
   ranSetup: config.ranSetup(),
   directoryBase: path.basename(cwd),
   isGitRepo: code === 0,
   containsContent: fileObjs.length > 0,
};
