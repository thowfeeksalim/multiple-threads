const { parentPort, workerData } = require("worker_threads");
const fs = require("fs");

const primes = findPrimeNumbers(workerData.num);
const primeCount = primes.length;

// Write prime numbers to a file
fs.writeFileSync("primes1.txt", primes.join("\n"));

// Send prime count to the parent thread
parentPort.postMessage(primeCount);

function findPrimeNumbers(num) {
  const startTime = Date.now();

  const primes = [];

  for (let i = 2; i <= num; i++) {
    if (isPrimeNumber(i)) {
      primes.push(i);
    }
  }
  const endTime = Date.now();
  const executionTime = endTime - startTime;
  console.log(`Execution time: ${executionTime} milliseconds `);
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