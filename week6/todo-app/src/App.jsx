/* eslint-disable react/prop-types */
import { useState } from "react";

const initialTodos = [
  { task: "Take out the trash", completed: false },
  { task: "Walk the dog", completed: true },
  { task: "Do the weekly quizzes", completed: false },
];

const Todo = (props) => {
  let task = props.task;
  let completed = props.completed;
  let toggleCompleted = props.toggleCompleted;

  return (
    <section>
      <input type="checkbox" checked={completed} onChange={toggleCompleted} />
      <p style={{ display: "inline-block" }}>{task}</p>
    </section>
  );
};

function App() {
  const [todos, setTodos] = useState(initialTodos);
  console.log("rendering App");

  const toggleCompleted = (todo) => {
    let result = todos.filter((_todo) => _todo.task !== todo.task);
    setTodos([...result, { task: todo.task, completed: !todo.completed }]);
  };

  return (
    <>
      <header>
        <h1>Hello React Web!</h1>
      </header>
      <main>
        <h2>List of Todos</h2>
        {todos.map((todo) => (
          <Todo
            key={todo.task}
            task={todo.task}
            completed={todo.completed}
            toggleCompleted={() => toggleCompleted(todo)}
          />
        ))}
      </main>
    </>
  );
}

export default App;
