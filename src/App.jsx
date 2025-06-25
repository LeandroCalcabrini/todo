import { useState } from "react"
import Todo from "./components/Todo";
import '../src/App.css'
import Swal from 'sweetalert2';
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
    if(editValue.trim()){
       const newValue = todos.map(todo => todo.id === id ? {...todo,title:editValue.charAt(0).toUpperCase() + editValue.slice(1).toLowerCase()} : todo);
       setTodos(newValue);
    }  
  };

  const deleteAll = () => {
    const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger"
  },
  buttonsStyling: true
});
swalWithBootstrapButtons.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "Yes, delete it!",
  cancelButtonText: "No, cancel!",
  reverseButtons: true
}).then((result) => {
  if (result.isConfirmed) {
    setTodos([]);
    swalWithBootstrapButtons.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
  } else if (
    result.dismiss === Swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons.fire({
      title: "Cancelled",
      text: "Your imaginary file is safe :)",
      icon: "error"
    });
  }
});
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
    <button 
    className= "deleteAllBtn"
    onClick={() => deleteAll()}
  >Delete All</button>
</div>
     
    </div>
  )
}

export default App

