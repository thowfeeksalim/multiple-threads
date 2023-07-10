const { Worker } = require("worker_threads");

const num = 10000000;
const numThreads = 100;
const rangePerThread = Math.ceil(num / numThreads);

console.log("The entered num is " + num);

let primeCount = 0;
let executionTime = 0;
let finishedThreads = 0;

function handleWorkerMessage(message) {
  if (typeof message === "number") {
    primeCount += message;
  } else if (typeof message === "object" && "executionTime" in message) {
    executionTime = Math.max(executionTime, message.executionTime);
  }
}

function handleWorkerExit() {
  finishedThreads++;

  // Check if all workers have finished
  if (finishedThreads === numThreads) {
    console.log(`Execution time: ${executionTime} milliseconds`);
    console.log(`The total count of prime numbers up to the num is ${primeCount}`);
  }
}

for (let i = 0; i < numThreads; i++) {
  const start = i * rangePerThread + 2;
  const end = Math.min((i + 1) * rangePerThread, num);

  const worker = new Worker("./aa.js", { workerData: { start, end } });

  worker.on("message", handleWorkerMessage);
  worker.on("error", (error) => {
    console.error(`Worker error: ${error}`);
  });
  worker.on("exit", handleWorkerExit);
}
