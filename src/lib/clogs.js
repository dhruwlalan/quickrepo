const {
   white,
   whiteBright,
   red,
   redBright,
   blue,
   blueBright,
   green,
   greenBright,
   yellow,
   yellowBright,
   cyan,
   cyanBright,
   bold,
} = require('colorette');

module.exports = {
   log: {
      success(output) {
         console.log(bold(green(`✔ ${output}`)));
      },
      error(output) {
         console.log(bold(red(`✖ ${output}`)));
      },
      info(output) {
         console.log(bold(cyan(output)));
      },
      warn(output) {
         console.log(yellowBright(`⚠ ${output} ⚠`));
      },
      hint(message, command) {
         console.log(whiteBright(message));
         console.log(cyanBright(`$ quickrepo ${command}`));
         console.log(cyanBright(`$ qr ${command}`));
      },
   },

   white(output) {
      return whiteBright(output);
   },
   whiteB(output) {
      return bold(white(output));
   },
   red(output) {
      return redBright(output);
   },
   redB(output) {
      return bold(red(output));
   },
   blue(output) {
      return blueBright(output);
   },
   blueB(output) {
      return bold(blue(output));
   },
   green(output) {
      return greenBright(output);
   },
   greenB(output) {
      return bold(green(output));
   },
   yellow(output) {
      return yellowBright(output);
   },
   yellowB(output) {
      return bold(yellow(output));
   },
   cyan(output) {
      return cyanBright(output);
   },
   cyanB(output) {
      return bold(cyan(output));
   },
};
