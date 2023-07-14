
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

This is a Node.js project that demonstrates how to use multiple threads in JavaScript to achieve parallel processing.

## Description

The purpose of this project is to showcase how to leverage the power of multiple threads in Node.js to perform computationally intensive tasks concurrently. It provides a simple example of creating and managing worker threads to distribute workload and improve overall performance.

## Features

- Creates multiple worker threads to execute tasks in parallel.
- Demonstrates how to communicate between the main thread and worker threads using messaging.
- Implements a basic load balancing strategy to distribute work evenly across threads.
- Provides an example of using thread pools to efficiently manage resources.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/thowfeeksalim/multiple-threads.git

<p align="center">           
<img src="https://images.ctfassets.net/hspc7zpa5cvq/20h5efXHT4bQbuf44mdq2H/a40944191d031217a9169b17a8ef35d6/worker-diagram_2x__1_.jpg">
</p>

# Load Test Comparison

This repository contains two different implementations of a load test for a prime number calculation API. The load tests were executed using the k6 load testing tool. Below is a comparison of the two load tests and their conclusions.

## Load Test 1: Using Worker Threads

### Code Snippet 

```javascript


const { Worker } = require("worker_threads");
const express = require("express");
const port = 4000;
const app = express();
app.use(express.json());

app.post("/prime", async (req, res) => {
  const { num } = req.body;
  const start = 2;
  const end = num;
  let primeCount = 0;
  let executionTime = 0;

  function handleWorkerMessage(message) {
    if (typeof message === "number") {
      primeCount += message;
    } else if (typeof message === "object" && "executionTime" in message) {
      executionTime = Math.max(executionTime, message.executionTime);
    }
  }

  const worker = new Worker(".//worker.js", {
    workerData: { start, end },
  });

  worker.on("message", handleWorkerMessage);
  worker.on("error", (error) => {
    console.error(`Worker error: ${error}`);
  });

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

### worker.js

```javascript


const { parentPort, workerData } = require("worker_threads");
//const fs = require("fs");

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

const startTime = Date.now();

const primes = findPrimeNumbers(workerData.start, workerData.end);
const primeCount = primes.length;

const executionTime = Date.now() - startTime;

parentPort.postMessage(primeCount);
parentPort.postMessage({ executionTime });



```


### Load Test Configuration

```
k6 run --vus 100 --duration 30s Loadtest.js
```

### Load Test Conclusions

```javascript


          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: Loadtest.js
     output: -

  scenarios: (100.00%) 1 scenario, 100 max VUs, 1m0s max duration (incl. graceful stop):
           * default: 100 looping VUs for 30s (gracefulStop: 30s)


     ✓ is status 200

     checks.........................: 100.00% ✓ 646       ✗ 0
     data_received..................: 162 kB  4.8 kB/s
     data_sent......................: 77 kB   2.3 kB/s
     http_req_blocked...............: avg=2.69ms   min=0s    med=0s    max=33.46ms p(90)=13.3ms   p(95)=26.21ms
     http_req_connecting............: avg=2.43ms   min=0s    med=0s    max=30.42ms p(90)=12.8ms   p(95)=19.77ms
     http_req_duration..............: avg=5.05s    min=2.63s med=4.94s max=7.87s   p(90)=7.27s    p(95)=7.69s
       { expected_response:true }...: avg=5.05s    min=2.63s med=4.94s max=7.87s   p(90)=7.27s    p(95)=7.69s
     http_req_failed................: 0.00%   ✓ 0         ✗ 646
     http_req_receiving.............: avg=129.82µs min=0s    med=0s    max=4ms     p(90)=974.05µs p(95)=1ms
     http_req_sending...............: avg=211.95µs min=0s    med=0s    max=76.96ms p(90)=282.65µs p(95)=997.4µs
     http_req_tls_handshaking.......: avg=0s       min=0s    med=0s    max=0s      p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=5.05s    min=2.63s med=4.94s max=7.87s   p(90)=7.27s    p(95)=7.69s
     http_reqs......................: 646     19.169361/s
     iteration_duration.............: avg=5.06s    min=2.67s med=4.95s max=7.87s   p(90)=7.27s    p(95)=7.71s
     iterations.....................: 646     19.169361/s
     vus............................: 41      min=41      max=100
     vus_max........................: 100     min=100     max=100


running (0m33.7s), 000/100 VUs, 646 complete and 0 interrupted iterations
default ✓ [======================================] 100 VUs  30s


```


- The load test was executed using the script "Loadtest.js" with local execution.
- One scenario was defined, which utilized 100 virtual users (VUs) and had a maximum duration of 30 seconds, including a graceful stop after 30 seconds.
- The test passed with a status code of 200 for all requests.
- 100% of the checks passed, with 646 checks executed and no failures.
- Data received: 162 kB at a rate of 4.8 kB/s.
- Data sent: 77 kB at a rate of 2.3 kB/s.
- Average HTTP request blocked time: 2.69 ms, with a minimum of 0s and maximum of 33.46 ms.
- Average HTTP request connecting time: 2.43 ms, with a minimum of 0s and maximum of 30.42 ms.
- Average HTTP request duration: 5.05 seconds, with a minimum of 2.63 seconds and maximum of 7.87 seconds.
- Average expected response time: 5.05 seconds, with a minimum of 2.63 seconds and maximum of 7.87 seconds.
- No failed HTTP requests: 0% failure rate with 0 failed requests out of 646.
- Average HTTP request receiving time: 129.82 µs, with a minimum of 0s and maximum of 4 ms.
- Average HTTP request sending time: 211.95 µs, with a minimum of 0s and maximum of 76.96 ms.
- No TLS handshaking time observed.
- Average HTTP request waiting time: 5.05 seconds, with a minimum of 2.63 seconds and maximum of 7.87 seconds.
- Total HTTP requests made: 646, with an average rate of 19.169361/s.
- Average iteration duration: 5.06 seconds, with a minimum of 2.67 seconds and maximum of 7.87 seconds.
- Total iterations: 646, with an average rate of 19.169361/s.
- Virtual Users (VUs): Ranged from 41 to a maximum of 100 VUs.
- Maximum VUs reached: 100, with a minimum of 100 and maximum of 100.

## Load Test 2: Without Using Worker Threads

### Code Snippet

```javascript


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



```
### Loadtest.js

```javascript



import http from "k6/http";
import { check } from "k6";

export default function () {
    const url = "http://localhost:5000/prime"

    const payload = JSON.stringify({ num: 10000 });
    const response = http.post(url, payload);

    check(response ,{
      "is status 200": (r) => r.status === 200,
    });
}


```


### Load Test Configuration

```
k6 run --vus 100 --duration 30s load-test.js
```

### Load Test Conclusions


```javascript



          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: load-test.js
     output: -

  scenarios: (100.00%) 1 scenario, 100 max VUs, 1m0s max duration (incl. graceful stop):
           * default: 100 looping VUs for 30s (gracefulStop: 30s)


     ✓ is status 200

     checks.........................: 100.00% ✓ 34925       ✗ 0
     data_received..................: 8.8 MB  291 kB/s
     data_sent......................: 4.2 MB  138 kB/s
     http_req_blocked...............: avg=386.69µs min=0s      med=0s      max=150.38ms p(90)=0s       p(95)=0s
     http_req_connecting............: avg=351.83µs min=0s      med=0s      max=145.63ms p(90)=0s       p(95)=0s
     http_req_duration..............: avg=85.31ms  min=358.3µs med=73.03ms max=362.33ms p(90)=136.64ms p(95)=155.63ms
       { expected_response:true }...: avg=85.31ms  min=358.3µs med=73.03ms max=362.33ms p(90)=136.64ms p(95)=155.63ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 34925
     http_req_receiving.............: avg=128.74µs min=0s      med=0s      max=90.03ms  p(90)=516.59µs p(95)=565.87µs
     http_req_sending...............: avg=57.48µs  min=0s      med=0s      max=89.1ms   p(90)=0s       p(95)=517.5µs
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=85.12ms  min=148µs   med=72.87ms max=360.57ms p(90)=136.35ms p(95)=154.8ms
     http_reqs......................: 34925   1159.801814/s
     iteration_duration.............: avg=85.99ms  min=948.9µs med=73.31ms max=404.04ms p(90)=137.22ms p(95)=156.68ms
     iterations.....................: 34925   1159.801814/s
     vus............................: 100     min=100       max=100
     vus_max........................: 100     min=100       max=100


running (0m30.1s), 000/100 VUs, 34925 complete and 0 interrupted iterations
default ✓ [======================================] 100 VUs  30s


```

- The load test was executed using the script "load-test.js" with local execution.
- One scenario was defined, which utilized 100 virtual users (VUs) and had a maximum duration of 30 seconds, including a graceful stop after 30 seconds.
- The test passed with a status code of 200 for all requests.
- 100% of the checks passed, with 34,925 checks executed and no failures.
- Data received: 8.8 MB at a rate of 291 kB/s.
- Data sent: 4.2 MB at a rate of 138 kB/s.
- Average HTTP request blocked time: 386.69 µs, with a minimum of 0s and maximum of 150.38 ms.
- Average HTTP request connecting time: 351.83 µs, with a minimum of 0s and maximum of 145.63 ms.
- Average HTTP request duration: 85.31 ms, with a minimum of 358.3 µs and maximum of 362.33 ms.
- Average expected response time: 85.31 ms, with a minimum of 358.3 µs and maximum of 362.33 ms.
- No failed HTTP requests: 0% failure rate with 0 failed requests out of 34,925.
- Average HTTP request receiving time: 128.74 µs, with a minimum of 0s and maximum of 90.03 ms.
- Average HTTP request sending time: 57.48 µs, with a minimum of 0s and maximum of 89.1 ms.
- No TLS handshaking time observed.
- Average HTTP request waiting time: 85.12 ms, with a minimum of 148 µs and maximum of 360.57 ms.
- Total HTTP requests made: 34,925, with an average rate of 1159.801814/s.
- Average iteration duration: 85.99 ms, with a minimum of 948.9 µs and maximum of 404.04 ms.
- Total iterations: 34,925, with an average rate of 1159.801814/s.
- Virtual Users (VUs): Consistently at 100 VUs throughout the test.
- Maximum VUs reached: 100, with a minimum of 100 and maximum of 100.

## Conclusion

By comparing the two load tests, we can draw the following conclusions:

1. Both implementations passed the load test with a status code of 200 for all requests.
2. The load test using Worker Threads (Load Test 1) had a lower data transfer rate compared to the load test without using Worker Threads (Load Test 2).
3. Load Test 1 had lower average HTTP request blocked time and connecting time compared to Load Test 2.
4. Load Test 1 had lower average HTTP request duration and expected response time compared to Load Test 2.
5. Load Test 2 had higher data received and data sent compared to Load Test 1.
6. Load Test 2 had higher average HTTP request receiving time and sending time compared to Load Test 1.
7. Both load tests had a 0% failure rate with no failed HTTP requests.
8. Load Test 2 had a higher average HTTP request waiting time compared to Load Test 1.
9. Load Test 1 had a higher average iteration duration compared to Load Test 2.
10. Load Test 2 had a higher average iteration rate compared to Load Test 1.
11. Both load tests utilized 100 virtual users (VUs) throughout the test, but Load Test 1 had a varying number of VUs ranging from 41 to 100.

```javascript
Here is a comparison of the two scenarios in a table format:

-----------------------------------------------------------------------------
| Aspect                       | Using Worker Thread | Without Worker Thread |
|------------------------------|---------------------|-----------------------|
| Execution                    | Local               | Local                 |
| Script                       | Loadtest.js         | load-test.js          |
| Output                       | -                   | -                     |
| Scenarios                    | 1                   | 1                     |
| Max VUs                      | 100                 | 100                   |
| Max Duration                 | 1m0s                | 1m0s                  |
| Looping VUs                  | 100                 | 100                   |
| Duration (Looping VUs)       | 30s                 | 30s                   |
| Status 200                   | Yes                 | Yes                   |
| Checks                       | 100.00% ✓ 646       | 100.00% ✓ 34925       |
| Data Received                | 162 kB              | 8.8 MB                |
| Data Sent                    | 77 kB               | 4.2 MB                |
| Avg HTTP Req Blocked         | 2.69ms              | 386.69µs              |
| Min HTTP Req Blocked         | 0s                  | 0s                    |
| Med HTTP Req Blocked         | 0s                  | 0s                    |
| Max HTTP Req Blocked         | 33.46ms             | 150.38ms              |
| p(90) HTTP Req Blocked       | 13.3ms              | 0s                    |
| p(95) HTTP Req Blocked       | 26.21ms             | 0s                    |
| Avg HTTP Req Connecting      | 2.43ms              | 351.83µs              |
| Min HTTP Req Connecting      | 0s                  | 0s                    |
| Med HTTP Req Connecting      | 0s                  | 0s                    |
| Max HTTP Req Connecting      | 30.42ms             | 145.63ms              |
| p(90) HTTP Req Connecting    | 12.8ms              | 0s                    |
| p(95) HTTP Req Connecting    | 19.77ms             | 0s                    |
| Avg HTTP Req Duration        | 5.05s               | 85.31ms               |
| Min HTTP Req Duration        | 2.63s               | 358.3µs               |
| Med HTTP Req Duration        | 4.94s               | 73.03ms               |
| Max HTTP Req Duration        | 7.87s               | 362.33ms              |
| p(90) HTTP Req Duration      | 7.27s               | 136.64ms              |
| p(95) HTTP Req Duration      | 7.69s               | 155.63ms              |
| Avg HTTP Req Receiving       | 129.82µs            | 128.74µs              |
| Min HTTP Req Receiving       | 0s                  | 0s                    |
| Med HTTP Req Receiving       | 0s                  | 0s                    |
| Max HTTP Req Receiving       | 4ms                 | 90.03ms               |
| p(90) HTTP Req Receiving     | 974.05µs            | 516.59µs              |
| p(95) HTTP Req Receiving     | 1ms                 | 565.87µs              |
| Avg HTTP Req Sending         | 211.95µs            | 57.48µs               |
| Min HTTP Req Sending         | 0s                  | 0s                    |
| Med HTTP Req Sending         | 0s                  | 0s                    |
| Max HTTP Req Sending         | 76.96ms             | 89.1ms                |
| p(90) HTTP Req Sending       | 282.65µs            | 0s                    |
| p(95) HTTP Req Sending       | 997.4µs             | 517.5µs               |
| Avg HTTP Req TLS Handshaking | 0s                  | 0s                    |
| Min HTTP Req TLS Handshaking | 0s                  | 0s                    |
| Med HTTP Req TLS Handshaking | 0s                  | 0s                    |
| Max HTTP Req TLS Handshaking | 0s                  | 0s                    |
| p(90) HTTP Req TLS Handshaking | 0s                | 0s                    |
| p(95) HTTP Req TLS Handshaking | 0s                | 0s                    |
| Avg HTTP Req Waiting         | 5.05s               | 85.12ms               |
| Min HTTP Req Waiting         | 2.63s               | 148µs                 |
| Med HTTP Req Waiting         | 4.94s               | 72.87ms               |
| Max HTTP Req Waiting         | 7.87s               | 360.57ms              |
| p(90) HTTP Req Waiting       | 7.27s               | 136.35ms              |
| p(95) HTTP Req Waiting       | 7.69s               | 154.8ms               |
| HTTP Req Failed              | 0.00% ✓ 0          | 0.00% ✓ 34925         |
| HTTP Reqs                    | 646                 | 34925                 |
| Iteration Duration           | avg=5.06s           | avg=85.99ms           |
| Min Iteration Duration       | 2.67s               | 948.9µs               |
| Med Iteration Duration       | 4.95s               | 73.31ms               |
| Max Iteration Duration       | 7.87s               | 404.04ms              |
| p(90) Iteration Duration     | 7.27s               | 137.22ms              |
| p(95) Iteration Duration     | 7.71s               | 156.68ms              |
| Iterations                   | 646                 | 34925                 |
| VUs                          | 41                  | 100                   |
| Min VUs                      | 41                  | 100                   |
| Max VUs                      | 100                 | 100                   |
| VUs Max                      | 100                 | 100                   |
------------------------------------------------------------------------------

Here are the explanations of some terms mentioned in the comparison:

1. Execution: Refers to the execution environment, which in this case is "local," indicating that the load testing is being performed on a local machine.
2. Script: Specifies the name of the script being executed for the load testing. It is "Loadtest.js" in the scenario using a worker thread and "load-test.js" in the scenario without a worker thread.
3. Scenarios: Indicates the number of load testing scenarios being executed. In both cases, there is one scenario.
4. Max VUs: Represents the maximum number of virtual users (VUs) that can be simulated simultaneously. It is set to 100 in both scenarios.
5. Max Duration: Defines the maximum duration allowed for the load testing, including a graceful stop. It is set to 1 minute (1m0s) in both scenarios.
6. Looping VUs: Refers to the number of VUs that continuously loop through the load testing scenario. It is set to 100 in both scenarios.
7. Checks: Represents the percentage of checks passed successfully during the load testing. It is measured in percentage and shows 100.00% in both scenarios.
8. Data Received: Indicates the amount of data received during the load testing in kilobytes (kB) or megabytes (MB). It is 162 kB in the scenario with a worker thread and 8.8 MB in the scenario without a worker thread.
9. Data Sent: Refers to the amount of data sent during the load testing in kilobytes (kB) or megabytes (MB). It is 77 kB in the scenario with a worker thread and 4.2 MB in the scenario without a worker thread.
10. HTTP Req Duration: Represents the average duration of the HTTP requests made during the load testing. It is measured in seconds (s) and shows an average of 5.05s in the scenario with a worker thread and an average of 85.31ms (milliseconds) in the scenario without a worker thread.

```
# Conclusion:
Comparing the two scenarios, it can be observed that the scenario using a worker thread performs better in terms of average HTTP request duration, with an average of 5.05 seconds. On the other hand, the scenario without a worker thread has a lower average HTTP request duration, with an average of 85.31 milliseconds.

Additionally, the scenario without a worker thread handles a significantly higher volume of data, both in terms of data received and data sent. However, it is important to note that the scenario using a worker thread has a higher number of checks passed successfully, indicating a more reliable performance.

Based on these observations, it can be concluded that the scenario using a worker thread may provide better overall performance and reliability, despite handling a smaller volume of data compared to the scenario without a worker thread. However, further analysis and consideration of specific requirements are necessary to determine the most suitable approach for a given load testing scenario.

<br>
<br>
<p align="center">           
<img src="https://www.wikitechy.com/tutorials/csharp/img/c-sharp-images/c-sharp-multithreading.gif">
</p>

