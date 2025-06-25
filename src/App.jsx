import { useState } from "react"
import Todo from "./components/Todo";
import '../src/App.css'

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter,setFilter] = useState("All");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if(inputValue.trim()){
       const newTodo = {
      title: inputValue.charAt(0).toUpperCase() + inputValue.slice(1).toLowerCase(),
      id: crypto.randomUUID(),
      completed: false
    };
    setTodos([...todos,newTodo]);
    setInputValue("");
    }
  };

  const checkComplete = (id) => {
    const todoCheck = todos.map(todo => todo.id === id ? {...todo, completed:!todo.completed} : todo)
    setTodos(todoCheck)
  };

  const todoDelete = (id) => {
    const deleteItem = todos.filter(todo => todo.id !== id);
    setTodos(deleteItem);
  };

  const saveEditTodo = (id, editValue) => {
    const newValue = todos.map(todo => todo.id === id ? {...todo,title:editValue} : todo)
    setTodos(newValue);
  };

    const filterTodos = todos.filter(todo => {
      if (filter === "Active") return !todo.completed;
      if (filter === "Completed") return todo.completed;
      return true
    });

  return (
    <div className="appContainer">
      <h1 className="title">To-Do List</h1>
    <form className="todoForm">
      <input
      className="todoInput"
      onChange={handleChange}
      value={inputValue}
      type="text"/>
      <button 
      className="buttonAdd"
      onClick={handleClick}
      type="submit">Add</button>
    </form>
    <div className="todoContainer">
      <ul>
        {filterTodos.map(todo => (
          <Todo  key={todo.id} todo={todo} checkComplete={checkComplete}todoDelete={todoDelete} saveEditTodo={saveEditTodo}/>
        ))}
      </ul>
    </div>
   <div className="filterButtons">
  <button 
    className={filter === "All" ? "filterBtn active" : "filterBtn"}
    onClick={() => setFilter("All")}
  >All</button>

  <button 
    className={filter === "Active" ? "filterBtn active" : "filterBtn"}
    onClick={() => setFilter("Active")}
  >Active</button>

  <button 
    className={filter === "Completed" ? "filterBtn active" : "filterBtn"}
    onClick={() => setFilter("Completed")}
  >Completed</button>
</div>
     
    </div>
  )
}

export default App

