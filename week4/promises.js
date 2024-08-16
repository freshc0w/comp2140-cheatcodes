import logger from "./logger.js";

const exampleFetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};

/**
  What is a promise?
  A promise is an object that represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.
  A promise is in one of these states:
  - pending: initial state, neither fulfilled nor rejected.
  - fulfilled: meaning that the operation completed successfully.
  - rejected: meaning that the operation failed.
  A promise is settled if it’s not pending (it has been resolved or rejected).
  Once settled, a promise can not be resettled.
  Promises are used to handle asynchronous operations in JavaScript. They are easy to manage when dealing with multiple asynchronous operations where callbacks can create callback hell leading to unmanageable code.
  Promises are one way to deal with asynchronous code, without writing too many callbacks.
  Promises can be consumed by registering functions using .then and .catch methods.
  The .then method is executed when the promise is resolved.
  The .catch method is executed when the promise is rejected.
 */
// Syntax:
const example1 = (isSuccessful = true) => {
  logger.green("Example 1: Promise");
  const promise = new Promise(function (resolve, reject) {
    // do something
    if (isSuccessful) {
      resolve("Stuff worked!");
    } else {
      reject(Error("It broke"));
    }
  });
  promise
    .then((result) => {
      logger.green(result); // Stuff worked!
    })
    .catch((err) => {
      logger.red(err); // Error
    });

  return promise;
};

// async/await
const example2 = async () => {
  logger.green("Example 2: async/await");
  const fetchDummyData = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Launch codes!");
    }, 1000);
  });

  logger.blue("Fetching launch codes...");
  const result = await fetchDummyData;
  logger.blue("Results fetched!");
  console.log(result); // done!
};

const main = () => {
  logger.blue("Running promises.js");
  example1(); 
  logger.blue("Finished running promises.js");
  example2(); // Takes time!
};

main();
