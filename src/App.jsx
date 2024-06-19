import { useState, useEffect, } from 'react'
import{Link, Navigate, useLocation, Route,Routes} from "react-router-dom"
import Login from './components/Login';
import Signup from "./components/Signup"
import Home from "./components/Home"

import './App.css'

function App() {
  const [user, setUser] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    setUser(false);
    localStorage.removeItem('token');
  };

  
  useEffect(() => {
    const isToken = localStorage.getItem('token');
    if (isToken) setUser(true);
  }, []);


  return (
      <>
      <nav>
      {!user ? (
        <>
          {location.pathname !== '/' && <Link to='/'>Login</Link>}
          {/* {'  |  '} */}
          {location.pathname !== '/signup' && <Link to='/signup'>Signup</Link>}
        </>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
      
    </nav>
      
      <Routes>
        <Route path="/" element={<Login setUser={setUser}  />}></Route> 
        <Route path='/signup' element={<Signup setUser={setUser} />} />
        <Route path='/home' element={user ? <Home /> : <Navigate to='/' />} />
      </Routes>
      </>
    
  )
}

export default App
