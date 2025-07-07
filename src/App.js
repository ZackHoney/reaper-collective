import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Login';
import Servers from './components/Servers';
import Projects from './components/Projects';
import Videos from './components/Videos';
import Gallery from './components/Gallery';
import Monetization from './components/Monetization';
import Mods from './components/Mods';
import Stats from './components/Stats'
import Signup from './components/Signup';

function App() {
return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/servers' element={<Servers />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/videos' element={<Videos />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/monetization' element={<Monetization />} />
        <Route path='/mods' element={<Mods />} />
        <Route path='/stats' element={<Stats />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  )
}


export default App;
