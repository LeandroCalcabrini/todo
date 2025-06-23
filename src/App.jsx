import { useState } from "react"
import Todo from "./components/Todo";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

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
  }

  console.log(todos)



  return (
    <>
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
    <div>
      <ul className="todoContainer">
        {todos.map(todo => (
          <Todo  key={todo.id} todo={todo} checkComplete={checkComplete}/>
        ))}
      </ul>
    </div>
     
    </>
  )
}

export default App
