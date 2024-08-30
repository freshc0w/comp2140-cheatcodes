import { useEffect, useState } from "react";
import "./App.css";
import courses from "./scripts/data/courses.json";

const getCourses = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(courses);
    }, 500);
  });
};

const CourseContainer = ({ course }) => {
  return (
    <li className="course-container" style={{ listStyle: "none" }}>
      <h2>{course.code}</h2>
      <p>{course.title}</p>
    </li>
  );
};

function App() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getCourses();
      setCourses(data);
      setFilteredCourses(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);

    const filteredCourses =
      e.target.value !== ""
        ? courses.filter((course) =>
            course.code.toLowerCase().includes(search.toLowerCase()),
          )
        : courses;

    setFilteredCourses(filteredCourses);
  };
  return (
    <>
      <header>hello world</header>
      <input type="search" value={search} onChange={handleSearchChange} />
      {isLoading && <p>Loading...</p>}
      <ul className="courses">
        {filteredCourses.slice(0, 100).map((course) => (
          <CourseContainer key={course.code} course={course} />
        ))}
      </ul>
    </>
  );
}

export default App;
