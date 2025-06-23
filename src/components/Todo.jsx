import { useState } from "react"

const Todo = ({todo, checkComplete, todoDelete, saveEditTodo}) => {
    const [edit, setEdit] = useState(false);

    const TodoItem = () => {

        return(
        <li className="todoItem">
            <input 
            type="checkbox"
            checked={todo.completed}
            onChange={()=>checkComplete(todo.id)}>
            </input>
            <span className="todoTitle">{todo.title}</span>
            <button 
            className="buttonEdit"
            onClick={()=> setEdit(true)}>Edit
            </button>
            <button 
            className="buttonDelete"
            onClick={()=>todoDelete(todo.id)}>Delete</button>
        </li>
        )
    };

    const ItemEdit = () => {
        const [editValue, setEditValue] = useState(todo.title);
      
        const handleEditChange = (e) => {
            setEditValue(e.target.value);
        };

        const handleSaveClick = () => {
            saveEditTodo(todo.id, editValue)
            setEdit(false)
        };

        return(
            <li
            className="todoItem">
                    <input 
                    type="text"
                    value={editValue}
                    onChange={handleEditChange}>
                    </input>
                    <button
                    className="buttonSave"
                    type="button"
                    onClick={handleSaveClick}
                 >Save</button>              
        </li>    
        )
    };

    return(      
        edit ? <ItemEdit/> : <TodoItem/>  
    )
}

export default Todo;