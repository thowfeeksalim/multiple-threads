import http from "k6/http";
import { check } from "k6";

export default function () {
  const url = "http://localhost:4000/prime";
  const payload = JSON.stringify({ num: 10000 });

  const response = http.post(url, payload);

  check(response, {
    "is status 200": (r) => r.status === 200,
  });
}
