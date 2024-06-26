import { useState, useEffect, } from 'react'
import{Link, Navigate, useLocation, Route,Routes} from "react-router-dom"
import './App.css'
import Login from './components/Login';
import Signup from "./components/Signup"
import Home from "./components/Home"

import AddHousehold from './components/AddHousehold';
import SearchHousehold from './components/SearchHousehold';
import ShoppingPage from './components/ShoppingPage';
import BalancePage from './components/BalancePage';
import PersonalBalance from './components/PersonalBalance';



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


   // Redirect to login if user is not logged in and on a protected page
   if (!user && !['/', '/signup'].includes(location.pathname)) {
    return <Navigate to="/" />;
  }

  

  return (
      <>
       <nav className="flex justify-end p-4">
        {!user && location.pathname !== '/' && ( // Hide logout button on login page
          <>
            <Link to="/">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
        {user && location.pathname !== '/' && ( // Show logout button when logged in
          <div className="flex items-center space-x-2">
            <button className="btn-door flex items-center space-x-2 mr-12" onClick={handleLogout}>
              <img src="../src/assets/LogoutClicked.svg" alt="Logout" className="w-10 h-10" />
              <h1 className="text-white">Logout</h1>
            </button>
          </div>
        )}
      </nav>
      
      
      <Routes>
        <Route path="/" element={<Login setUser={setUser}  />} />
        <Route path='/signup' element={<Signup setUser={setUser} />} />
        <Route path='/home' element={user ? <Home /> : <Navigate to='/' />} />
         <Route path="/shoppingpage" element={<ShoppingPage />} />
         <Route path="/balance" element={<BalancePage />}/>
         <Route path="/add-household" element={<AddHousehold />} />
        <Route path="/search-household" element={<SearchHousehold />} />
         <Route path="/balancepage" element={<BalancePage />} />
          <Route path="/personal-balance" element={<PersonalBalance />} />
    </Routes>
      </>
    
  )
}

export default App
