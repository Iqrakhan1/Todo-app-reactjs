import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  // Load todos from localStorage when the app loads
  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      const storedTodos = JSON.parse(todoString);
      setTodos(storedTodos);
    }
  }, []);

  // Save todos to localStorage
  const saveToLocalStorage = (updatedTodos) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  // Add a new todo
  const handelAdd = () => {
    if (todo.trim() === "") return; // Prevent adding empty todos
    const updatedTodos = [...todos, { id: uuidv4(), todo, iscompleted: false }];
    setTodos(updatedTodos);
    setTodo("");
    saveToLocalStorage(updatedTodos);
  };

  // Edit an existing todo
  const handelEdit = (e, id) => {
    const itemToEdit = todos.find((item) => item.id === id);
    if (itemToEdit) {
      setTodo(itemToEdit.todo); // Set the todo text in the input field
      const updatedTodos = todos.filter((item) => item.id !== id); // Remove the item from the list
      setTodos(updatedTodos);
      saveToLocalStorage(updatedTodos);
    }
  };

  // Delete a todo
  const handelDelete = (e, id) => {
    const updatedTodos = todos.filter((item) => item.id !== id);
    setTodos(updatedTodos);
    saveToLocalStorage(updatedTodos);
  };

  // Handle checkbox toggle
  const handelCheckbox = (e) => {
    const id = e.target.name;
    const updatedTodos = todos.map((item) =>
      item.id === id ? { ...item, iscompleted: !item.iscompleted } : item
    );
    setTodos(updatedTodos);
    saveToLocalStorage(updatedTodos);
  };

  return (
    <>
      <Navbar />
      <main>
        <div className="text-center">
          <div className="welcome-screen md:h-80 hidden md:block">
            <h1 className="md:text-6xl text-2xl text-white md:pt-16 pt-5">
              Welcome to <span className="text-blue-900">QuickTask</span>
            </h1>
            <p className="text-sm hidden md:block mb-10 text-white">
              Simple and Efficient To-Do List App for Better Productivity
            </p>
          </div>

          <div className="mx-auto bg-blue-100 md:w-3/4 min-h-96 md:-mt-24 md:p-10 p-2 rounded-md md:mb-10 my-10">
            <div>
              <h2 className="text-2xl text-blue-800 text-start mb-5">
                Create a To-Do List
              </h2>
              <div className="md:flex justify-between gap-6">
                <input
                  onChange={(e) => setTodo(e.target.value)}
                  value={todo}
                  type="text"
                  placeholder="Add a task"
                  className="md:w-2/3 w-full mb-2 p-2 md:mb-0 text-gray-700 placeholder-gray-400 rounded-lg focus:outline-none"
                />
                <button
                  onClick={handelAdd}
                  className="md:w-1/3 w-full p-2 text-white rounded-lg bg-blue-600 hover:bg-blue-700">
                  Save
                </button>
              </div>
            </div>
            {todos.length === 0 && (
              <div>
                <p className="text-lg text-gray-700 mt-20">
                  Your tasks will appear here
                </p>
              </div>
            )}
            <div className="m-10">
              {todos.map((item) => (
                <div
                  key={item.id}
                  className="md:flex justify-between w-full items-center my-3 gap-10">
                  <div className="flex items-center mb-3">
                    <input
                      type="checkbox"
                      onChange={handelCheckbox}
                      checked={item.iscompleted}
                      name={item.id}
                      className="form-checkbox w-4 h-4 mr-2"
                    />
                    <h3
                      className={item.iscompleted ? "line-through" : ""}
                      style={{ textAlign: "left" }}>
                      {item.todo}
                    </h3>
                  </div>
                  <div className="text-white flex">
                    <button
                      onClick={(e) => handelEdit(e, item.id)}
                      className="bg-green-600 hover:bg-green-700 p-1 h-full flex items-center m- rounded-lg px-6 gap-2 mr-2">
                      <FaRegEdit />
                      Edit
                    </button>
                    <button
                      onClick={(e) => handelDelete(e, item.id)}
                      className="bg-red-600 p-1 hover:bg-red-700 h-full flex items-center m- rounded-lg px-6 gap-2">
                      <MdDelete />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
