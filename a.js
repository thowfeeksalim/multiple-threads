let num = 1000;
console.log("The enter the num is " + num);
const { Worker } = require("worker_threads");

const worker = new Worker("./aa.js", { workerData: { num } });

let primeCount = 0;
let executionTime = 0;

worker.on("message", (message) => {
  if (typeof message === "object" && "executionTime" in message) {
    executionTime = message.executionTime;
  } else if (typeof message === "number") {
    primeCount = message;
    console.log(
      `The total count of prime numbers up to the num is ${primeCount}`
    );
    console.log(`Execution time: ${executionTime} milliseconds`);
  }
});

worker.on("error", (error) => {
  console.error(`Worker error: ${error}`);
});

worker.on("exit", (code) => {
  if (code !== 0) {
    console.error(`Worker stopped with exit code ${code}`);
  }
});
