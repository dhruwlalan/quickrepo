const fs = require('fs');
const path = require('path');
const execa = require('execa');
const store = require('./store');

const cwd = process.cwd();
const fileObjs = fs.readdirSync(cwd);

let code = 0;
try {
   code = execa.sync('git', ['rev-parse', '--is-inside-work-tree']).exitCode;
} catch (error) {
   code = 128;
}

module.exports = {
   ranSetup: store.ranSetup(),
   directoryBase: path.basename(cwd),
   isGitRepo: code === 0,
   containsContent: fileObjs.length > 0,
};
