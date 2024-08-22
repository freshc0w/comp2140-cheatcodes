import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
	mode: "production", // Set this to "development" or "production" as needed
	entry: "./src/rocket-launch.js",
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "dist"),
	},
};