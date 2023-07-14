const express = require("express");
const port = 5000;
const app = express();
app.use(express.json());

app.post("/prime", (req, res) => {
  const { num } = req.body;
  const start = 2;
  const end = num;
  let primeCount = 0;
  let executionTime = 0;

  const startTime = Date.now();

  const primes = findPrimeNumbers(start, end);
  primeCount = primes.length;

  executionTime = Date.now() - startTime;

  res.json({
    primeCount,
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

function findPrimeNumbers(start, end) {
  const primes = [];

  for (let i = start; i <= end; i++) {
    if (isPrimeNumber(i)) {
      primes.push(i);
    }
  }

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
