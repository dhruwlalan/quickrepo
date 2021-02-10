import * as colorette from 'colorette';

export const log = {
   success(output: string) {
      console.log(colorette.bold(colorette.green(`✔ ${output}`)));
   },
   error(output: string) {
      console.log(colorette.bold(colorette.red(`✖ ${output}`)));
   },
   info(output: string) {
      console.log(colorette.bold(colorette.cyan(output)));
   },
   warn(output: string) {
      console.log(colorette.yellowBright(`⚠ ${output} ⚠`));
   },
   hint(message: string, command: string) {
      console.log(colorette.whiteBright(message));
      console.log(colorette.cyanBright(`$ qr ${command}`));
   },
};

export function white(output: string) {
   return colorette.whiteBright(output);
}
export function whiteB(output: string) {
   return colorette.bold(colorette.white(output));
}
export function red(output: string) {
   return colorette.redBright(output);
}
export function redB(output: string) {
   return colorette.bold(colorette.red(output));
}
export function blue(output: string) {
   return colorette.blueBright(output);
}
export function blueB(output: string) {
   return colorette.bold(colorette.blue(output));
}
export function green(output: string) {
   return colorette.greenBright(output);
}
export function greenB(output: string) {
   return colorette.bold(colorette.green(output));
}
export function yellow(output: string) {
   return colorette.yellowBright(output);
}
export function yellowB(output: string) {
   return colorette.bold(colorette.yellow(output));
}
export function cyan(output: string) {
   return colorette.cyanBright(output);
}
export function cyanB(output: string) {
   return colorette.bold(colorette.cyan(output));
}
