import {Link,useLocation} from 'react-router-dom'
import {useState,useEffect} from 'react'
import { AiFillHome } from 'react-icons/ai'       // Home icon
import { BsFillCalendarCheckFill } from 'react-icons/bs' // My Bookings icon
import { MdContactMail } from 'react-icons/md'     // Contact Us icon
import { FaUserCircle } from 'react-icons/fa'     // Profile icon

import './index.css'

const Footer=()=>{
  const [footerActiveTab,setFooterActiveTab]=useState('Home')

  const location=useLocation()

  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setFooterActiveTab('Home')
    else if (path === '/bookings') setFooterActiveTab('My_Bookings')
    else if (path === '/contact') setFooterActiveTab('Contact_Us')
    else if (path === '/profile') setFooterActiveTab('Profile')
  }, [location.pathname])

  return(
      <div className="nav-menu-mobile">
      <ul className="nav-menu-list-mobile">
        <li className="nav-menu-item-mobile">
          <Link to="/" className={footerActiveTab==='Home'?'footer-link footer-active':'footer-link'}>
            <AiFillHome
              alt="nav home"
            />
          </Link>
        </li>
        <li className="nav-menu-item-mobile">
          <Link to="/bookings" className={footerActiveTab==='My_Bookings'?'footer-link footer-active':'footer-link'}>
            <BsFillCalendarCheckFill
              alt="nav bookings"
            />
          </Link>
        </li>
        <li className="nav-menu-item-mobile">
          <Link to="/contact" className={footerActiveTab==='Contact_Us'?'footer-link footer-active':'footer-link'}>
            <MdContactMail
              alt="nav contact"
            />
          </Link>
        </li>
        <li className="nav-menu-item-mobile">
          <Link to="/profile" className={footerActiveTab==='Profile'?'footer-link footer-active':'footer-link'}>
            <FaUserCircle
              alt="nav profile"
            />
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Footer