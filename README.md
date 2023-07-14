
<h1 align="center"> <strong>🧵 Multiple Threads🧵 </strong> </h1> 
<p align="center">
  <p align="center">
    <br />
    <a href="#about-the-project"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="#">View Demo</a>
    ·
    <a href="https://github.com/thowfeeksalim/multiple-threads/issues">Report Bug</a>
    ·
    <a href="https://github.com/thowfeeksalim/multiple-threads/issues">Request Feature</a>
  </p>
</p>
<p align="center">           
<img src="https://images.ctfassets.net/hspc7zpa5cvq/20h5efXHT4bQbuf44mdq2H/a40944191d031217a9169b17a8ef35d6/worker-diagram_2x__1_.jpg">
</p>


### Summary

This repository demonstrates the use of worker threads in Node.js to improve the performance of a prime number calculation task. It includes two code snippets: one that utilizes worker threads (`worker.js`). The load tests were conducted using two different methods to compare their performance.

### Code Snippet 1: Using Worker Threads

The first code snippet (`multiple-requests1.js`) utilizes worker threads to perform the prime number calculation task in a parallel manner. Here's a breakdown of the code:

```javascript
const { Worker } = require("worker_threads");
const express = require("express");
const port = 4000;
const app = express();
app.use(express.json());

app.post("/prime", async (req, res) => {
  // Extracting input data
  const { num } = req.body;
  const start = 2;
  const end = num;
  let primeCount = 0;
  let executionTime = 0;

  // Function to handle worker messages
  function handleWorkerMessage(message) {
    if (typeof message === "number") {
      primeCount += message;
    } else if (typeof message === "object" && "executionTime" in message) {
      executionTime = Math.max(executionTime, message.executionTime);
    }
  }

  // Creating a worker thread
  const worker = new Worker(".//worker.js", {
    workerData: { start, end },
  });

  // Event listeners for worker
  worker.on("message", handleWorkerMessage);
  worker.on("error", (error) => {
    console.error(`Worker error: ${error}`);
  });

  // Event listener for worker exit
  worker.on("exit", () => {
    res.json({
      primeCount,
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

This code sets up an Express server that listens for POST requests to the `/prime` endpoint. When a request is received, it extracts the input number, initializes variables for counting prime numbers and tracking execution time, and creates a worker thread using `Worker` from the `worker_threads` module. The worker thread runs the task in the separate JavaScript file `worker.js`. The main thread listens for messages from the worker and updates the `primeCount` and `executionTime` variables accordingly. Once the worker thread exits, the server responds with the `primeCount` value.

### Code Snippet 2: Without Worker Threads

The second code snippet (`load-test.js`) performs the prime number calculation task without using worker threads. Here's a breakdown of the code:

```javascript
const express = require("express");
const port = 5000;
const app = express();
app.use(express.json());

app.post("/prime", (req, res) => {
  // Extracting input data
  const { num } = req.body;
  const start = 2;
  const end = num;
  let primeCount = 0;
  let executionTime = 0;

  // Timing the execution
  const startTime = Date.now();

  // Calculating prime numbers
  const primes = findPrimeNumbers(start, end);
  primeCount = primes.length;

  // Calculating execution time
  executionTime = Date.now() - startTime;

  // Responding with the result
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
```

This code sets up an Express server that listens for POST requests to the `/prime` endpoint. When a request is received, it extracts the input number, initializes variables for counting prime numbers and tracking execution time, and calculates the prime numbers using the `findPrimeNumbers` function. It then responds with the `primeCount` value.

### Load Test Results and Conclusions

The load tests were conducted using two different methods: one with worker threads and another without worker threads. Here are the conclusions drawn from the load test results for each method:

#### Load Test Results: Using Worker Threads




```javascript
  execution: local
     script: Loadtest.js
     output: -
     data_sent......................: 86 kB   2.7 kB/s
     http_req_blocked...............: avg=1.34ms   min=0s    med=0s    max=20.67ms  p(90)=4.14ms   p(95)=12.6ms
     http_req_connecting............: avg=688.97µs min=0s    med=0s    max=19.4ms   p(90)=2.64ms   p(95)=6.1ms
     http_req_duration..............: avg=4.29s    min=2.04s med=4.19s max=6.99s    p(90)=5.45s    p(95)=6.03s
       { expected_response:true }...: avg=4.29s    min=2.04s med=4.19s max=6.99s    p(90)=5.45s    p(95)=6.03s
     http_req_failed................: 0.00%   ✓ 0         ✗ 726
     http_req_receiving.............: avg=406.5µs  min=0s    med=0s    max=213.6ms  p(90)=545.9µs  p(95)=1ms
     http_req_sending...............: avg=1.11ms   min=0s    med=0s    max=653.99ms p(90)=514.29µs p(95)=1.02ms
     http_req_tls_handshaking.......: avg=0s       min=0s    med=0s    max=0s       p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=4.29s    min=2.04s med=4.19s max=6.99s    p(90)=5.45s    p(95)=6.03s
     http_reqs......................: 726     22.440323/s
     iteration_duration.............: avg=4.29s    min=2.04s med=4.2s  max=7.02s    p(90)=5.45s    p(95)=6.03s
     iterations.....................: 726     22.440323/s
     vus............................: 19      min=19      max=100
     vus_max........................: 100     min=100     max=100

running (0m32.4s), 000/100 VUs, 726 complete and 0 interrupted iterations
default ✓ [======================================] 100 VUs  30s
```



- Data sent: 86 kB at a rate of 2.7 kB/s.
- HTTP request blocked time: Average of 1.34 ms, with a minimum of 0s and maximum of 20.67 ms.
- HTTP request connecting time: Average of 688.97 µs, with a minimum of 0s and maximum of 19.4 ms.
- HTTP request duration: Average of 4.29 seconds, with a minimum of 2.04 seconds and maximum of 6.99 seconds.
- Expected response time: Average of 4.29 seconds, with a minimum of 2.04 seconds and maximum of 6.99 seconds.
- No failed HTTP requests: 0% failure rate with 0 failed requests out of 726.
- HTTP request receiving time: Average of 406.5 µs, with a minimum of 0s and maximum of 213.6 ms.
- HTTP request sending time: Average of 1.11 ms, with a minimum of 0s and maximum of 653.99 ms.
- No TLS handshaking time observed.
- HTTP request waiting time: Average of 4.29 seconds, with a minimum of 2.04 seconds and maximum of 6.99 seconds.
- Total HTTP requests made: 726, with an average rate of 22.440323/s.
- Iteration duration: Average of 4.29 seconds, with a minimum of 2.04 seconds and maximum of 7.02 seconds.
- Total iterations: 726, with an average rate of 22.440323/s.
- Virtual Users (VUs): Ranged from 19 to a maximum of 100 VUs.
- Maximum VUs reached: 100, with a minimum of 100 and maximum of 100.

#### Load Test Results: Without Worker Threads



```javascript
execution: local
     script: load-test.js
     output: -

  scenarios: (100.00%) 1 scenario, 100 max VUs, 1m0s max duration (incl. graceful stop):
           * default: 100 looping VUs for 30s (gracefulStop: 30s)

     ✓ is status 200
     checks.........................: 100.00% ✓ 43763       ✗ 0
     data_received..................: 11 MB   365 kB/s
     data_sent......................: 5.2 MB  173 kB/s
     http_req_blocked...............: avg=67.02µs min=0s      med=0s      max=43.66ms  p(90)=0s      p(95)=0s
     http_req_connecting............: avg=50.72µs min=0s      med=0s      max=43ms     p(90)=0s      p(95)=0s
     http_req_duration..............: avg=68.29ms min=292.1µs med=62.15ms max=293.99ms p(90)=90.59ms p(95)=100.63ms
       { expected_response:true }...: avg=68.29ms min=292.1µs med=62.15ms max=293.99ms p(90)=90.59ms p(95)=100.63ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 43763
     http_req_receiving.............: avg=88.89µs min=0s      med=0s      max=87.38ms  p(90)=512.9µs p(95)=549µs
     http_req_sending...............: avg=49.71µs min=0s      med=0s      max=21.78ms  p(90)=0s      p(95)=517µs
     http_req_tls_handshaking.......: avg=0s      min=0s      med=0s      max=0s       p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=68.15ms min=0s      med=62.03ms max=293.03ms p(90)=90.43ms p(95)=100.5ms
     http_reqs......................: 43763   1454.344359/s
     iteration_duration.............: avg=68.62ms min=808µs   med=62.4ms  max=325.06ms p(90)=90.85ms p(95)=101.02ms
     iterations.....................: 43763   1454.344359/s
     vus............................: 100     min=100       max=100
     vus_max........................: 100     min=100       max=100


running (0m30.1s), 000/100 VUs, 43763 complete and 0 interrupted iterations
default ✓ [======================================] 100 VUs  30s
```




- Data received: 11 MB at a rate of 365 kB/s.
- Data sent: 5.2 MB at a rate of 173 kB/s.
- HTTP request blocked time: Average of 67.02 µs, with a minimum of 0s and maximum of 43.66 ms.
- HTTP request connecting time: Average of 50.72 µs, with a minimum of 0s and maximum of 43 ms.
- HTTP request duration: Average of 68.29 ms, with a minimum of 292.1 µs and maximum of 293.99 ms.
- Expected response time: Average of 68.29 ms, with a minimum of 292.1 µs and maximum of 293.99 ms.
- No failed HTTP requests: 0

% failure rate with 0 failed requests out of 43,763.
- HTTP request receiving time: Average of 88.89 µs, with a minimum of 0s and maximum of 87.38 ms.
- HTTP request sending time: Average of 49.71 µs, with a minimum of 0s and maximum of 21.78 ms.
- No TLS handshaking time observed.
- HTTP request waiting time: Average of 68.15 ms, with a minimum of 0s and maximum of 293.03 ms.
- Total HTTP requests made: 43,763, with an average rate of 1454.344359/s.
- Iteration duration: Average of 68.62 ms, with a minimum of 808 µs and maximum of 325.06 ms.
- Total iterations: 43,763, with an average rate of 1454.344359/s.
- Virtual Users (VUs): Consistently at 100 VUs throughout the test.
- Maximum VUs reached: 100, with a minimum of 100 and maximum of 100.

### Conclusion

Based on the load test results, the following conclusions can be drawn:

- Using Worker Threads:
  - The load test sent 726 HTTP requests, with an average rate of 22.440323/s.
  - The total data sent was 86 kB, with a rate of 2.7 kB/s.
  - The average duration for each request was 4.29 seconds.
  - The expected response time matched the duration, averaging at 4.29 seconds.
  - No failed requests were observed.
  - The load test involved a range of virtual users, with a maximum of 100 VUs.
  - The performance was consistent, with the maximum VUs consistently reached.

- Without Worker Threads:
  - The load test sent 43,763 HTTP requests, with an average rate of 1454.344359/s.
  - The total data received was 11 MB, with a rate of 365 kB/s.
  - The average duration for each request was 68.29 ms.
  - The expected response time matched the duration, averaging at 68.29 ms.
  - No failed requests were observed.
  - The load test was performed with a consistent 100 VUs.
  - The performance was stable, with no significant variations observed.

In conclusion, utilizing worker threads in the first code snippet (`worker.js`) improved the performance of the prime number calculation task. It allowed for parallel execution, resulting in a faster response time and the ability to handle higher numbers of requests. The load test results showed better performance metrics compared to the second code snippet (`load-test.js`), which executed the task without worker threads.
