import { useState } from "react"

function App() {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  console.log(inputValue)


  return (
    <>
    <form className="todoForm">
      <input
      className="todoInput"
      onChange={handleChange}
      value={inputValue}
      type="text"/>
      <button type="submit">Add</button>
    </form>
     
    </>
  )
}

export default App
