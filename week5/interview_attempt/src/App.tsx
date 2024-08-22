import { useEffect, useState } from "react";
import "./App.css";
import { getIssue, getSubtasks, statuses } from "./jira-issue-view/task";

const icons = {
  downIcon: "▼",
  rightIcon: "▶",
};

function App() {
  const [currIssue, setCurrIssue] = useState(null);
  const [subTasks, setSubTasks] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchIssues = async () => {
      const data = await getIssue();
      setCurrIssue(data);
    };
    const fetchSubTasks = async () => {
      const data = await getSubtasks();
      setSubTasks(data);
    };

    fetchIssues();
    fetchSubTasks();
  }, []);

  useEffect(() => {
    const fetchIssues = async () => {
      const data = await getIssue();
      setCurrIssue(data);
    };
    const fetchSubTasks = async () => {
      const data = await getSubtasks();
      setSubTasks(data);
    };

    fetchIssues();
    fetchSubTasks();
  }, []);

  const currStatus = !currIssue ? "" : currIssue.status;

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <header>
        <h1>Title of the issue</h1>
        <select id="status" name="status" value={currStatus}>
          {statuses.map((status, idx) => {
            return (
              <option key={idx} value={status}>
                {status}
              </option>
            );
          })}
        </select>
      </header>
      <main>
        <a onClick={handleClick} href="#">
          {isExpanded ? icons.downIcon : icons.rightIcon}
          Show subtasks
        </a>
        <ul>
          {isExpanded
            ? subTasks.map((subTask) => {
                return (
                  <li className="subtask" key={subTask.id}>
                    <span>{subTask.title}</span>
                    <span>{subTask.status}</span>
                  </li>
                );
              })
            : null}
        </ul>
      </main>
    </>
  );
}

export default App;
