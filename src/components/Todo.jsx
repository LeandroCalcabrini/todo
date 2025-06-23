const Todo = ({todo, checkComplete, todoDelete}) => {

    return(
        <li className="todoItem">
            <input 
            type="checkbox"
            checked={todo.completed}
            onChange={()=>checkComplete(todo.id)}/>
            <span className="todoTitle">{todo.title}</span>
            <button className="buttonEdit">Edit</button>
            <button 
            className="buttonDelete"
            onClick={()=>todoDelete(todo.id)}>Delete</button>
        </li>
    )
}

export default Todo;