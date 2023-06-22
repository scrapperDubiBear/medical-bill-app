import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='leftside'> 
        <ul>
          <li className='nav-item'><Link className='link' to="/">Home</Link></li>
          <li className='nav-item'><Link className='link' to="/form">Upload Bills</Link></li>
        </ul>
      </div>
      
      <div className='rightside'> 
      <ul>
          <img src='/heart-rate.png' width='15%' alt='logo'/> 
          <li className='logo'> All Your Medical Bills in One Place! </li>
      </ul>
       
      </div>
    </nav>
       
  )
}

export default Navbar;