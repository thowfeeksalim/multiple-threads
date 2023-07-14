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

  const worker = new Worker(".//multiple-requests2.js", {
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
