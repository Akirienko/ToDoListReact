import './Header.scss'

import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="header">
      <div className="main-container">
        <div className="header-wrap">
          <nav>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/profile">Profile</Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header