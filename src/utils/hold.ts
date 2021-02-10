export default (ms: number): Promise<boolean> =>
   new Promise((resolve) => {
      setTimeout(() => {
         resolve(true);
      }, ms);
   });
