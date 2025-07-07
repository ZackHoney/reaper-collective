import { IoMenu } from "react-icons/io5";

const NavBar = () => {

  return (
    <div className='dropdown'>
      <button className="dropbtn"><IoMenu/></button>
      <nav className="dropdown-content">
        <a href="/" className='button'>Home</a>
        <a href="/login" className='button'> Login</a>
        <a href="/servers" className='button'>Servers</a>
        <a href="/projects" className='button'>Projects</a>
        <a href="/videos" className='button'>Videos</a>
        <a href="/gallery" className='button'>Gallery</a>
        <a href="/monetization" className='button'>Monetization</a>
        <a href="/mods" className='button'>The Mods</a>
        <a href="/stats" className='button'>My Stats</a>
      </nav>
    </div>
  )
}

export default NavBar