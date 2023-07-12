const { Worker } = require("worker_threads");
const express = require("express");

const port = 3000;
const numThreads = 1;
const app = express();

app.use(express.json());

app.post("/prime", async (req, res) => {
  const { num } = req.body;
  const rangePerThread = Math.ceil(num / numThreads);

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

  async function handleWorkerExit() {
    finishedThreads++;

    if (finishedThreads === numThreads) {
      res.json({
        primeCount
      });
    }
  }

  for (let i = 0; i < numThreads; i++) {
    const start = i * rangePerThread + 2;
    const end = Math.min((i + 1) * rangePerThread, num);

    const worker = new Worker("./thread-api2.js", {
      workerData: { start, end },
    });

    worker.on("message", handleWorkerMessage);
    worker.on("error", (error) => {
      console.error(`Worker error: ${error}`);
    });

    // Promisify the exit event
    await new Promise((resolve) => {
      worker.on("exit", () => {
        handleWorkerExit();
        resolve();
      });
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});




