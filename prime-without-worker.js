const startTime = Date.now();
const fs = require("fs");

let num = 1000000;

console.log(`\nThe num is: ${num}`);

const primes = findPrimeNumbers(num);
const primeCount = primes.length;

fs.writeFileSync("primes2.txt", primes.join("\n"));

console.log(`The total count of prime numbers up to the num is ${primeCount}`);

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
console.log(`Execution time: ${executionTime}ms`);
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


