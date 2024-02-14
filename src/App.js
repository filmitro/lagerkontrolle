import { useState } from "react";
import ToDo from "./ToDo";
import ToDoForm from "./ToDoForm";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9XkRjUWytUePuGxx9DDo0t0Auyr0nCgI",
  authDomain: "lagerkontrolle-bfe9c.firebaseapp.com",
  projectId: "lagerkontrolle-bfe9c",
  storageBucket: "lagerkontrolle-bfe9c.appspot.com",
  messagingSenderId: "528589231187",
  appId: "1:528589231187:web:33be718a559c5b4a4e22a6",
  measurementId: "G-KG1F6Y3J8K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  const [todos, setTodos] = useState([]);

  const addTask = (userInput) => {
    if (userInput) {
      const newItem = {
        id: Math.random().toString(36).substr(2, 9),
        task: userInput,
        complete: false,
      };
      setTodos([...todos, newItem]);
    }
  };

  const removeTask = (id) => {
    setTodos([...todos.filter((todo) => todo.id !== id)]);
  };

  const handleToggle = (id) => {
    setTodos([
      ...todos.map((todo) =>
        todo.id === id ? { ...todo, complete: !todo.complete } : { ...todo }
      ),
    ]);
  };

  return (
    <div className="App">
      <header>
        <h1>Список задач: {todos.length}</h1>
      </header>
      <ToDoForm addTask={addTask} />
      {todos.map((todo) => {
        return (
          <ToDo
            todo={todo}
            key={todo.id}
            toggleTask={handleToggle}
            removeTask={removeTask}
          />
        );
      })}
    </div>
  );
}

export default App;
