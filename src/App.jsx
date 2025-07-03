import { useEffect, useState } from "react"
import Todo from "./components/Todo";
import '../src/App.css'
import Swal from 'sweetalert2';
import Footer from "./components/Footer";

function App() {
  const [inputValue, setInputValue] = useState(""); // Estado para obtener el valor del input
  const [todos,setTodos] = useState(()=>{ // Estado de las tareas, inizializada mediente localstorage
    try{
      const todosLocalStorage = localStorage.getItem("todos");
      return todosLocalStorage ? JSON.parse(todosLocalStorage) : [];
    }catch(error){console.error('Error al cargar el localStorage:',error)} // Manejo de error por si falla algo al traer datos del localstorage
    
  });
  const [filter,setFilter] = useState("All"); // Estado de los filtros.

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])

  
  const handleChange = (e) => { //Funcion para obtener valor del input
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => { // Funcion para agregar una nueva tarea a la lista de tareas
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

  const checkComplete = (id) => { // Funcion para indicar si una tarea esta completa
    const todoCheck = todos.map(todo => todo.id === id ? {...todo, completed:!todo.completed} : todo)
    setTodos(todoCheck)
  };

  const todoDelete = (id) => { // Funcion para eliminar una tarea
    const deleteItem = todos.filter(todo => todo.id !== id);
    setTodos(deleteItem);
  };

  const saveEditTodo = (id, editValue) => { // Funcion para editar una tarea
    if(editValue.trim()){
       const newValue = todos.map(todo => todo.id === id ? {...todo,title:editValue.charAt(0).toUpperCase() + editValue.slice(1).toLowerCase()} : todo);
       setTodos(newValue);
    }  
  };

  const deleteAll = () => { // Funcion para eliminar todas las tareas
    if(todos.length > 0){
      const swalWithBootstrapButtons = Swal.mixin({ // Uso de la librearia de SweetAler para mostrar alerta cuando quieren eliminar todas las tareas
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
    };

    const filterTodos = todos.filter(todo => { // Funcion para filtrar las tareas entre pendientes, completadas y todas
      if (filter === "Active") return !todo.completed;
      if (filter === "Completed") return todo.completed;
      return true
    });


  return (
    <>
     <section className="appContainer">
      <article className="app">
        <h1 className="title">To-Do List</h1>
    <form className="todoForm" onSubmit={handleSubmit}>
      <input
      className="todoInput"
      onChange={handleChange}
      value={inputValue}
      type="text"
      placeholder="Add something new to do"/>
      <button 
      className="buttonAdd"
      type="submit">Add</button>
    </form>
    <div className="todoContainer">
      <ul>
        {filterTodos.map(todo => (
          <Todo  key={todo.id} todo={todo} checkComplete={checkComplete}todoDelete={todoDelete} saveEditTodo={saveEditTodo}/>
        ))}
        {filter === 'Completed' && filterTodos.length == 0 && <p className="text-error">There are no completed tasks yet</p>}
        {filter === 'Active' && filterTodos.length == 0 && <p className="text-error">There are no pending tasks</p>}
      </ul>
    </div>
   <div className="filterButtons">
  <button 
    className={filter === "All" ? "filterBtn active" : "filterBtn"}
    onClick={() => setFilter("All")}>All</button>
  <button 
    className={filter === "Active" ? "filterBtn active" : "filterBtn"}
    onClick={() => setFilter("Active")}>Active</button>
  <button 
    className={filter === "Completed" ? "filterBtn active" : "filterBtn"}
    onClick={() => setFilter("Completed")}
  >Completed</button>
    <button 
    className= "deleteAllBtn"
    onClick={() => deleteAll()}
  >Delete All</button>
</div>
      </article>
    </section>
    <Footer/>
  </>  
  )
}

export default App

