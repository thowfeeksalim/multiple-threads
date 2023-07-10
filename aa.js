const startTime = Date.now();
const { parentPort, workerData } = require("worker_threads");

const num = workerData.num;


let primeCount = 0;

for (let i = 2; i <= num; i++) {
  if (isPrimeNumber(i)) {
    primeCount++;
  }
}
const executionTime = Date.now() - startTime;
parentPort.postMessage(primeCount);
parentPort.postMessage({ executionTime });
function isPrimeNumber(num) {
  if (num < 2) {
    return false;
  }
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }  
  return true;
}
