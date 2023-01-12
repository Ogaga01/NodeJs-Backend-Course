const fs = require("fs");
const crypto = require("crypto");
const start = Date.now();

setTimeout(() => console.log("Timer 1 finished"), 0);
setImmediate(() => console.log("Timer 2 finished"));

fs.readFile("test-file.txt", (err, data) => {
  console.log("I/O completed");
  console.log("---------------------------");
  setTimeout(() => console.log("Timer 3 finished"), 0);
  setTimeout(() => console.log("Timer 3a finished"), 3000);

  process.nextTick(() => console.log("process.nextTick"));
  setImmediate(() => console.log("Timer 4 finished"));

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () =>
    console.log(Date.now() - start, "password encrypted")
  );
});

console.log("Hello from the top level code");


