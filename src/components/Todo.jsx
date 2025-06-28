import { useState } from "react"
import deleteIcon from '../assets/icons/delete.svg';
import editIcon from '../assets/icons/edit.svg';
import saveIcon from '../assets/icons/save.svg';
import '../components/todo.css'

const Todo = ({todo, checkComplete, todoDelete, saveEditTodo}) => {
    const [edit, setEdit] = useState(false);

    const TodoItem = () => {
        return(
        <li className="todoItem">
            <input 
            type="checkbox"
            className="checkbox"
            checked={todo.completed}
            onChange={()=>checkComplete(todo.id)}>
            </input>
            <span className={todo.completed ? "todoTitle active" :"todoTitle"}>{todo.title}</span>
            <button 
            className="buttonEdit"
            onClick={()=> setEdit(true)}>
                <img src={editIcon} alt="" />
            </button>
            <button 
            className="buttonDelete"
            onClick={()=>todoDelete(todo.id)}>
                <img src={deleteIcon} alt="" />
            </button>
        </li>
        )
    };

    const ItemEdit = () => {
        const [editValue, setEditValue] = useState(todo.title);
      
        const handleEditChange = (e) => {
            setEditValue(e.target.value);
        };

        const handleSaveSubmit = () => {
            saveEditTodo(todo.id, editValue)
            setEdit(false)
        };

        return(
            <li
            className="todoItem">
                <form onSubmit={handleSaveSubmit}>
                    <input 
                    type="text"
                    className="inputEdit"
                    value={editValue}
                    onChange={handleEditChange}>
                    </input>
                    <button
                    className="buttonSave"
                    type="submit"
                    >
                    <img src={saveIcon} alt="" />
                    </button>      
                </form>
                            
        </li>    
        )
    };

    return(      
        edit ? <ItemEdit/> : <TodoItem/>  
    )
}

export default Todo;