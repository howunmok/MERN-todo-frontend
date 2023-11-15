import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import ToDoList from "./components/ToDoList/ToDoList";
import axios from "axios";

interface Task {
  _id: string;
  task: string;
  done: boolean;
}

// const LOCAL_STORAGE_KEY = "todo:savedTasks";

function App() {
  // create an empty array
  const [tasks, setTasks] = useState<Task[]>([]);

  // Display exist tasks
  useEffect(() => {
    async function loadTasks() {
      try {
        // const response = await axios.get("http://localhost:5002/api/tasks");
        const response = await axios.get(
          "https://mern-todo-backend-mh82.onrender.com/api/tasks"
        );
        setTasks(response.data);
      } catch (error) {
        console.error("Error loading tasks:", error);
      }
    }
    loadTasks();
  }, []);
  // --- For Local storage ---
  // function loadSavedTasks() {
  //   const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  //   console.log(saved);
  //   if (saved) {
  //     setTasks(JSON.parse(saved));
  //   }
  // }
  // useEffect(() => {
  //   loadSavedTasks();
  // }, []);

  // save tasks
  // --- For Local storage ---
  // function setTasksAndSave(newTasks) {
  //   setTasks(newTasks);
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  // }

  // add new tasks
  async function addTask(taskContent: string) {
    try {
      const newTask = {
        task: taskContent,
        done: false,
      };
      const response = await axios.post(
        // "http://localhost:5002/api/tasks/add",
        "https://mern-todo-backend-mh82.onrender.com/api/tasks/add",
        newTask
      );
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }
  // --- For Local storage ---
  // function addTask(taskContent: string) {
  //   setTasksAndSave([
  //     ...tasks,
  //     {
  //       id: crypto.randomUUID(),
  //       content: taskContent,
  //       isCompleted: false,
  //     },
  //   ]);
  // }

  // delete tasks
  async function deleteTaskById(taskId) {
    try {
      // await axios.delete(`http://localhost:5002/api/tasks/delete/${taskId}`);
      await axios.delete(
        `https://mern-todo-backend-mh82.onrender.com/api/tasks/delete/${taskId}`
      );
      const newTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(newTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }
  // --- For Local storage ---
  // function deleteTaskById(taskId) {
  //   const newTasks = tasks.filter((task) => task.id !== taskId);
  //   setTasksAndSave(newTasks);
  // }

  // update tasks
  async function toggleTaskCompletedById(taskId) {
    try {
      const task = tasks.find((task) => task._id === taskId);
      if (!task) {
        console.error(`No task found with id: ${taskId}`);
        return;
      }
      const updatedTask = { ...task, done: !task.done };
      await axios.put(
        // `http://localhost:5002/api/tasks/update/${taskId}`,
        `https://mern-todo-backend-mh82.onrender.com/api/tasks/update/${taskId}`,
        updatedTask
      );
      const newTasks = tasks.map((task) =>
        task._id === taskId ? updatedTask : task
      );
      setTasks(newTasks);
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  }
  // --- For Local storage ---
  // function toggleTaskCompletedById(taskId) {
  //   const newTasks = tasks.map((task) => {
  //     if (task.id === taskId) {
  //       return {
  //         ...task,
  //         isCompleted: !task.isCompleted,
  //       };
  //     }
  //     return task;
  //   });
  //   setTasksAndSave(newTasks);
  // }

  return (
    <>
      <Header onAddTask={addTask} />
      <ToDoList
        tasks={tasks}
        onDelete={deleteTaskById}
        onComplete={toggleTaskCompletedById}
      />
    </>
  );
}

export default App;
