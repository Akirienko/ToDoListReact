import './HeaderTodo.scss'

import logo from '../../assets/image/logo.webp'

function Header() {


  return (
    <>
      <header className="HeaderTodo">
        <div className="weather">Weather</div>

        <div className="logo">
          <img src={logo} alt="logo" />
          <p>
            to
            <span>
              do.
            </span>
          </p>
        </div>

        <div className="profile">Profile</div>
      </header>
    </>
  )
}

export default Header

