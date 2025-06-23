const Todo = ({todo, checkComplete}) => {
    return(
        <li className="todoItem">
            <input 
            type="checkbox"
            checked={todo.completed}
            onChange={()=>checkComplete(todo.id)}/>
            <span className="todoTitle">{todo.title}</span>
            <button className="buttonEdit">Edit</button>
            <button className="buttonDelete">Delete</button>
        </li>
    )
}

export default Todo;