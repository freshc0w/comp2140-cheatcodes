import CourseService from "../services/courses.js";
import fs from "fs";
import * as cheerio from "cheerio";

const writeCourses = async (dirPath, filename) => {
  console.time("fetching courses");
  const coursesHTML = await CourseService.getAll();
  console.timeEnd("fetching courses");
  const $ = cheerio.load(coursesHTML);
  const courses = [];

  // {code: 'COMP7506', title: 'Advanced Data Analytics', description: 'This course provides an introduction to advanced data analytics techniques and tools for data analysis.'}

  $("a.code").each((index, element) => {
    courses.push({
      code: $(element).text(),
      title: $(element).next().text(),
    });
  });

  console.info("found:", courses.length, "courses");

  const path = `${dirPath}/${filename}`;

  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);

  console.time(`writing courses to ${path}`);
  fs.writeFileSync(path, JSON.stringify(courses, null, 2));
  console.timeEnd(`writing courses to ${path}`);

  console.info("courses written to", path);
};

writeCourses("./data", "courses.json");
