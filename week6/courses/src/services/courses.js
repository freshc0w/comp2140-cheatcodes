// fetch all courses
const getAll = async () => {
  const url =
    "https://programs-courses.uq.edu.au/search.html?keywords=course&searchType=all&archived=true";
  const response = await fetch(url);
  const text = await response.text();
  return text;
};

export default { getAll };
