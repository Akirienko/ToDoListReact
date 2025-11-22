import { Routes, Route } from 'react-router-dom'

import Header from './components/Header/Header'
import HomePage from './pages/Home/Home'
import LoginPage from './pages/Login/Login'
import ProfilePage from './pages/Profile/Profile'
import { TodoProvider } from "./context/todoList/TodoProvider"
import { AuthProvider } from "./context/auth/AuthProvider"


function App() {


  return (
    <>
      <AuthProvider>
        <Header />
        <div className="main-container">
          <Routes>
            <Route path="/" element={<TodoProvider><HomePage /></TodoProvider>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </AuthProvider>
    </>
  )
}

export default App
