import { Routes, Route } from 'react-router-dom'

import Header from './components/Header/Header'
import HomePage from './pages/Home/Home'
import LoginPage from './pages/Login/Login'
import ProfilePage from './pages/Profile/Profile'
import { TodoProvider } from "./context/todoList/TodoProvider"
import { AuthProvider } from "./context/auth/AuthProvider"
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute'


function App() {


  return (
    <>
      <AuthProvider>
        <Header />
        <div className="main-container">
          <Routes>
            <Route path="/" element={<ProtectedRoute><TodoProvider><HomePage /></TodoProvider></ProtectedRoute>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          </Routes>
        </div>
      </AuthProvider>
    </>
  )
}

export default App
