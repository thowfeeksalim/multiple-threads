const axios = require("axios");

async function sendRequest(num) {
  try {
    const response = await axios.post("http://localhost:4000/prime", { num });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

// Define the number of requests and the value of "num" parameter
const numRequests = 10;
const numValue = 100;

// Send requests in a loop
for (let i = 0; i < numRequests; i++) {
  sendRequest(numValue);
}
