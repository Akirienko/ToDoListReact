import Header from "./components/Header/Header"
import TodoContainer from "./components/TodoContainer/TodoContainer"
import { TodoProvider } from "./context/todoList/TodoProvider"


function App() {


  return (
    <>
      <div className="main-container">
        <Header />
        <TodoProvider>  
          <TodoContainer />
        </TodoProvider>
      </div>
    </>
  )
}

export default App
