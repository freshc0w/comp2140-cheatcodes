import fs from "fs";
import logger from "./logger.js";

const fetchData = async (url) => {
  const response = await fetch(url);
  const responseJSON = await response.json();
  console.log(responseJSON);
  console.log("total results found:", responseJSON.length);
  return responseJSON;
};

const writeToFileJSON = (data, filename) => {
  logger.blue("Writing to file: ", filename);
  fs.writeFileSync(filename, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      logger.red("Something went wrong when writing:", err);
      return;
    }
    console.log("File has been created");
  });
  logger.green("File has been created at:", filename);
};

const url = "https://api.spacexdata.com/v4/launches/";

const main = async () => {
  const launchData = await fetchData(url);
  writeToFileJSON(launchData, "launchData.json");
};

main();
