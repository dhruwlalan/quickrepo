export default (fn: any) => () => {
   try {
      fn();
   } catch (error) {
      console.log('MyError:', error.message);
      process.exit(1);
   }
};
