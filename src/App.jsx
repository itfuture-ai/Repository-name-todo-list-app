import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() === "") {
      return;
    }

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  return (
    <div className="app">
      <div className="todo-container">
        <h1>My To-Do List</h1>
        <p className="subtitle">Stay organized and get things done!</p>

        <div className="input-section">
          <input
            type="text"
            placeholder="Enter a new task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTask();
              }
            }}
          />

          <button onClick={addTask}>Add Task</button>
        </div>

        <div className="task-list">
          {tasks.length === 0 ? (
            <p className="empty-message">No tasks yet. Add one above! 🚀</p>
          ) : (
            tasks.map((task) => (
              <div
                className={`task ${task.completed ? "completed" : ""}`}
                key={task.id}
              >
                <div className="task-content">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />

                  <span>{task.text}</span>
                </div>

                <button
                  className="delete-btn"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;