export default async function (fn: any) {
   try {
      await fn();
   } catch (error) {
      console.log('MyError:', error.message);
      process.exit(1);
   }
}
