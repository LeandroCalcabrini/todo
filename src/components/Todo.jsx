const Todo = ({todo}) => {
    return(
        <>
        <li>
            <input type="checkbox" />
            <span>{todo.title}</span>
            <button>Edit</button>
            <button>Delete</button>

        </li>
        </>
    )
}

export default Todo;