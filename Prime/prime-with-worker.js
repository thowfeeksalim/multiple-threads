
// let num = Math.floor(Math.random() * 1000 + 1);
// console.log(`\nThe num is: ${num}`);
let num = 10000;
console.log('the nume is :'+num);
const { Worker } = require("worker_threads");
const worker = new Worker("./worker1.js", { workerData: { num } });

worker.on("message", (primeCount) => {
  console.log(
    `The total count of prime numbers up to the num is ${primeCount}`
  );
  
});

worker.on("error", (error) => {
  console.error(`Worker error: ${error}`);
});

worker.on("exit", (code) => {
  if (code !== 0) {
    console.error(`Worker stopped with exit code ${code}`);
  }
});
