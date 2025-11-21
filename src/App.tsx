import { Routes, Route } from 'react-router-dom'

import Header from './components/Header/Header'
import HomePage from './pages/Home/Home'
import LoginPage from './pages/Login/Login'
import ProfilePage from './pages/Profile/Profile'
import { TodoProvider } from "./context/todoList/TodoProvider"


function App() {


  return (
    <>
      <Header />
      <div className="main-container">
        <TodoProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </TodoProvider>
      </div>
    </>
  )
}

export default App
