const { parentPort, workerData } = require("worker_threads");
//const fs = require("fs");

function findPrimeNumbers(start, end) {
  const primes = [];

  for (let i = start; i <= end; i++) {
    if (isPrimeNumber(i)) {
      primes.push(i);
    }
  }
  //fs.writeFileSync("aaa.txt", primes.join("\n"));
  return primes;
}

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

const startTime = Date.now();

const primes = findPrimeNumbers(workerData.start, workerData.end);
const primeCount = primes.length;

const executionTime = Date.now() - startTime;

parentPort.postMessage(primeCount);
parentPort.postMessage({ executionTime });
