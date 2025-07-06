import React from 'react'
import { useNavigate } from 'react-router-dom'
import Stats from './Stats';
const NavBar = () => {
  const navigate = useNavigate();

  return (
   <div className='nav-container'>
          <nav className="nav">
            <button className="button">
              Login
            </button>
            <button className="button">
              Servers
            </button>
            <button className="button">
              Projects
            </button>
            <button className="button">
              Videos
            </button>
            <button className="button">
              Gallery
            </button>
            <button className="button">
              Monetization
            </button>
            <button className="button">
              Mods List
            </button>
           <button className='button' onClick={() => navigate(<Stats />)}>
              My Stats
           </button>
          </nav>
        </div>
  )
}

export default NavBar