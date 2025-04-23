import {Link,useNavigate,useLocation} from 'react-router-dom'
import {useState,useEffect} from 'react';
import { BiLogOut,BiLogIn } from 'react-icons/bi'
import Cookies from 'js-cookie'

import './index.css'

const Header = () => {
  const jwtToken=Cookies.get('username')
  
  const [isLoggedIn,setIsLoggedIn]=useState(!!jwtToken)
  const [navActiveTab, setNavActiveTab]=useState('Home')
  const navigate=useNavigate()
  const location=useLocation()

  const onClickLogout = () => {
    Cookies.remove('username')
    setIsLoggedIn(false)
    navigate('/')
  }

  const onClickLogin=()=>{
    navigate('/login')
  }

  useEffect(() => {
    const path = location.pathname
    if (path === '/') setNavActiveTab('Home')
    else if (path === '/bookings') setNavActiveTab('My_Bookings')
    else if (path === '/contact') setNavActiveTab('Contact_Us')
    else if (path === '/profile') setNavActiveTab('Profile')
  }, [location.pathname])

  return (
    <nav className="nav-header">
      <div className="nav-bar-mobile-logo-container">
        <Link to="/">
          <img
            className="website-logo"
            src="./images/logo.png"
            alt="website logo"
          />
        </Link>

        <button
          type="button"
          className="nav-mobile-btn"
          onClick={isLoggedIn? onClickLogout:onClickLogin}
        >
          {isLoggedIn? <BiLogOut
            alt="nav logout"
            style={{ color: 'black', fontSize: '24px' }}
          />:<BiLogIn
          alt="nav login"
          style={{ color: 'black', fontSize: '24px' }}
        />}
        </button>
      </div>

      <div className="nav-bar-large-container">
        <div style={{display: 'flex',flexDirection:'row',alignItems: 'center'}}>
          <Link to="/">
            <img
              className="website-logo"
              src="./images/logo.png"
              alt="website logo"
            />
          </Link>
          <h1 className='home-logo-heading'>YatraYaan</h1>
        </div>
        <ul className="nav-menu">
          <li className="nav-menu-item">
            <Link to="/" className={navActiveTab==='Home'?'nav-link nav-active':'nav-link'}>
              Home
            </Link>
          </li>

          <li className="nav-menu-item">
            <Link to="/bookings" className={navActiveTab==='My_Bookings'?'nav-link nav-active':'nav-link'}>
              My Bookings
            </Link>
          </li>

          <li className="nav-menu-item">
            <Link to="/contact" className={navActiveTab==='Contact_Us'?'nav-link nav-active':'nav-link'}>
              Contact Us
            </Link>
          </li>

          <li className="nav-menu-item">
            <Link to="/profile" className={navActiveTab==='Profile'?'nav-link nav-active':'nav-link'}>
              Profile
            </Link>
          </li>
        </ul>
        {isLoggedIn ? <button
          type="button"
          className="logout-desktop-btn"
          onClick={onClickLogout}
        >
          Logout
        </button>:<button
          type="button"
          className="logout-desktop-btn"
          onClick={onClickLogin}
        >
          Login
        </button>}
      </div>
    </nav>
  )
}

export default Header
