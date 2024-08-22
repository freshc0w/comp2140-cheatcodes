// Import dependencies using ES Modules (requires "type": "module" in package.json)
import promptSync from "prompt-sync";
const prompt = promptSync({
    sigint: false
});
import fetch from "node-fetch";
import fs from "fs/promises";

// The main app logic
function main() {
    
    // Declare global variables
    const numDays = 7;
    const numTop = 3;
    const maxDays = 2;
    const launchURL = "https://api.spacexdata.com/v4/launches/";
    const launchpadURL = "https://api.spacexdata.com/v4/launchpads/";
    const jsonFilename = (append) => `spacex-${append}.json`;
    
    /**
     * This function stringifies a given date format similar to UTC format.
     * @param {string} date - a date in UTC format (dd/mm/yyyy).
     * @returns {string} date similar to UTC format.
     */
    function dateStringify(date) {
        let month = new String(date.getMonth() + 1);
        if (month.length < 2) {
            month = `0${month}`;
        }
        let day = new String(date.getDate());
        if (day.length < 2) {
            day = `0${day}`;
        }
        return new String(`${date.getFullYear()}-${month}-${day}`);
    }
    
    /**
     * This function returns a new date offsetted by x days from today.
     * @param {number} days - a number of days to offset by.
     * @returns {Date} object.
     */
    function addDays(days) {
        let today = new Date();
        today.setDate(today.getDate() + days);
        return today;
    }
    
    // Declare date global variables
    
    const today = new Date();
    const todayDate = dateStringify(today);
    const oneDay = addDays(maxDays / 2);
    const oneDayDate = dateStringify(oneDay);
    const twoDay = addDays(maxDays);
    const twoDayDate = dateStringify(twoDay);
    
    // Declare message global variables
    
    let messageWelcome = "Welcome to the SpaceX Rocket Launch Checker!";
    let messageExiting = "Exiting. See you next time!";
    let messageInput = `Please enter \x1b[32mtoday\x1b[0m (${todayDate}) or \x1b[32mtomorrow\x1b[0m (${oneDayDate}) or \x1b[32mday after tomorrow\x1b[0m (${twoDayDate}) to return the number of filtered launches for that day: `;
    let messageInputInvalid = "This isn't one of the valid inputs. Please try again.";
    let messageSaveCache = (filenameAppend) => `Saved a JSON cache file called "${jsonFilename(filenameAppend)}".`;
    let messageReadCache = (filenameAppend) => `Read a JSON cache file called "${jsonFilename(filenameAppend)}".`;
    let messageFetching = (dayIndex, daySelected) => `Fetching data for "${dayIndex}" (${daySelected})...`;
    let messageFetchedLive = (dayIndex, daySelected) => `Successfully fetched live data for "${dayIndex}" (${daySelected}) from the API.`;
    let messageFiltered = (input, daySelectedFiltered) => `For the input of \x1b[32m${input}\x1b[0m, the filtered results are: ${daySelectedFiltered}`;
    
    /**
     * This function takes the user input and converts it into a formatted date.
     * @param {string} input - the user input from the prompt.
     * @returns {string|null} either a formatted date or null when no result.
     */
    function validateDate(input) {
        switch(input) {
            case "today":
                return todayDate;
            case "tomorrow":
                return oneDayDate;
            case "day after tomorrow":
                return twoDayDate;
            default:
                return null;
        }
    }
    
    /**
     * This function fetches data asynchronously based on the URL provided.
     * @param {string} url - the URL to fetch data from (expecting JSON).
     * @returns {string} the JSON response.
     */
    async function fetchData(url) {
        const response = await fetch(url);
        const responseJSON = await response.json();
        return responseJSON;
    }
    
    /**
     * This function will fetch launch data and filter the array based on the day.
     * @param {number} day - The selected day in date format
     * @returns {Array} the sorted array of launches based on date_unix and only the same day of the week.
     */
    async function filterLaunches(day) {
        
        // Fetch launch data for day of the week
        const launches = await fetchData(launchURL);
        let filteredLaunches = launches.filter(launch => new Date(launch.date_utc).getDay() == new Date(day).getDay() && launch.success);
        let filteredData = await Promise.all(filteredLaunches.map(async (launch) => {
            let launchpad = await fetchData(launchpadURL + launch.launchpad);
            launch["launchpad"] = launchpad;
            return launch;
        }));
        
        // Sort data based on the date_unix
        let sortData = filteredData.slice(0);
        sortData.sort((a, b) => a.date_unix - b.date_unix);
        return sortData;
    }
    
    /**
     * This function will populate data from fetched JSON and determine the number of filtered launches for the inputted day.
     * @param {number} input - The validated string as inputted by the user.
     */
    async function combineFetches(input) {
        
        let daySelected = validateDate(input);
        let daySelectedFiltered;
        
        let dataAll = {};
        let dataTop = {};
        
        // Try reading the cache files, if they exist
        let dataAllCached = await readCache("all");
        let dataTopCached = await readCache(`top${numTop}`);
        if (dataAllCached && dataTopCached) {
            dataAll = JSON.parse(dataAllCached);
            dataTop = JSON.parse(dataTopCached);
        }
        // Or revert to live operation
        else {
            
            // Setup base array for all data
            dataAll = {
                "today": [],
                "tomorrow": [],
                "day after tomorrow": [],
            }
            
            // Setup base array for top data
            dataTop = {
                ...dataAll // Spread operator used to duplicate array contents
            }
            
            for(let dayIndex in dataAll) {
                
                console.log(messageFetching(dayIndex, validateDate(dayIndex)));
                
                // Sorted data and filtered based on the selected day of week
                let dataAllFiltered = await filterLaunches(validateDate(dayIndex));
                console.log(messageFetchedLive(dayIndex, validateDate(dayIndex)));
                dataAll[dayIndex] = dataAllFiltered;
                
                let dataTopFiltered = dataAllFiltered.slice(0, numTop);
                dataTop[dayIndex] = dataTopFiltered;
            
            }
            
            // Store JSON objects into cache files
            await saveCache("all", dataAll);
            await saveCache(`top${numTop}`, dataTop);
            
        }
        
        // Output the number of filtered results for the input
        daySelectedFiltered = dataAll[input].length;
        console.log(messageFiltered(input, daySelectedFiltered));
        
    }
    
    /**
     * This function will save a JSON cache file with the specified filename & data.
     * @param {string} filenameAppend - The string to append to the JSON filename.
     * @param {string} data - The string containing JSON data to save.
     */
    async function saveCache(filenameAppend, data) {
        try {
            await fs.writeFile(jsonFilename(filenameAppend), JSON.stringify(data));
            console.log(messageSaveCache(filenameAppend));
        }
        catch(error) {
            console.log(error);
        }
    }
    
    /**
     * This function will read a JSON cache file with the specified filename.
     * @param {string} filenameAppend - The string to append to the JSON filename.
     * @returns {string} the JSON data from the cache file.
     */
    async function readCache(filenameAppend) {
        try {
            const data = await fs.readFile(jsonFilename(filenameAppend));
            console.log(messageReadCache(filenameAppend));
            return data;
        }
        catch(error) {
            console.log(error);
        }
    }
    
    // Synchronous prompt logic
    let day = null;
    let input;
    while (true) {
        console.log(messageWelcome);
        // Prompt the user for input
        input = prompt(messageInput);
        if (input === null) {
            break;
        }
        // Validate against expected inputs
        day = validateDate(input);
        if (day === null) {
            console.log(messageInputInvalid);
        }
        else {
            break;
        }
    }
    if (day === null) {
        console.log(messageExiting);
    }
    else {
        // Run fetches to get data
        combineFetches(input);
    }
    
}

main();