import React, { useState } from "react";
import "./Todo.css";

const Todo = () => {
  const [todos, setTodos] = useState([]); // State to store todos
  const [todoInput, setTodoInput] = useState(""); // State to manage new todo input
  const [isEditing, setIsEditing] = useState(null); // State to manage the index of the todo being edited
  const [editInput, setEditInput] = useState(""); // State to manage the text of the todo being edited

  const handleInputChange = (e) => {
    setTodoInput(e.target.value);
  };

  const handleEditInputChange = (e) => {
    setEditInput(e.target.value);
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (todoInput.trim()) {
      setTodos([...todos, { text: todoInput, isCompleted: false }]);
      setTodoInput("");
    }
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1); // Remove the selected todo
    setTodos(newTodos);
  };

  const editTodo = (index) => {
    setIsEditing(index);
    setEditInput(todos[index].text); // Set the edit input with the current text of the todo
  };

  const saveTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].text = editInput; // Update the todo text with the edited input
    setTodos(newTodos);
    setIsEditing(null); // Exit edit mode
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={todoInput}
          onChange={handleInputChange}
          placeholder="Add a new task"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} className={todo.isCompleted ? "completed" : ""}>
            {isEditing === index ? (
              <>
                <input
                  type="text"
                  value={editInput}
                  onChange={handleEditInputChange}
                />
                 <div className="buttons">
                <button className="save-btn" onClick={() => saveTodo(index)}>
                 Update
                </button>
                </div>
              </>
            ) : (
              <>
                <span>{todo.text}</span>
                <div className="buttons">
                  <button className="edit-btn" onClick={() => editTodo(index)}>
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteTodo(index)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
