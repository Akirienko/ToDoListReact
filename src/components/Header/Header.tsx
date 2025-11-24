import './Header.scss'
import logo from '../../assets/image/logo.webp'

import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import Button from '../Button';

const Header = () => {

  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <header className="header">
      <div className="main-container">
        <div className="header-wrap">
          <div className="logo">
            <img src={logo} alt="logo" />
            <span>ToDO</span>
          </div>
          <nav>
            {isAuthenticated ? (
              <>
                <Link to="/">Home</Link>
                <Link to="/profile">Profile</Link>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </nav>
          {isAuthenticated && (
            <div className="user">
              <span>Hi, {user?.username}!</span>
              <Button type="secondary" onClick={logout}>Logout</Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header