import fs from 'fs';
import path from 'path';
import execa from 'execa';

const cwd = process.cwd();
const fileObjs = fs.readdirSync(cwd);

let code = 0;
try {
   code = execa.sync('git', ['rev-parse', '--is-inside-work-tree']).exitCode;
} catch (error) {
   code = 128;
}

export default {
   directoryBase: path.basename(cwd),
   isGitRepo: code === 0,
   containsContent: fileObjs.length > 0,
};
