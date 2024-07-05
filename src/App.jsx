import { useState, useEffect } from 'react';
import { Link, Navigate, useLocation, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import AddHousehold from './components/AddHousehold';
import SearchHousehold from './components/SearchHousehold';
import ShoppingPage from './components/ShoppingPage';
import BalancePage from './components/BalancePage';
import PersonalBalance from './components/PersonalBalance';
import RequireLogin from './components/RequireLogin';

function App() {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token')) || null;
  const [debts, setDebts] = useState([]);
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(false);
    setToken(null);
    setAuth(false);
  };
  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, [auth]);

  //checking user token
  useEffect(() => {
    const checkValidToken = async (token) => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUser(data);
          setAuth(true);
        }
      } catch (error) {
        return error.response.data.error;
      }
    };
    token && checkValidToken(token);
  }, [token]);

  console.log(token);
  console.log(user);

  useEffect(() => {
    const updateDebts = async (token) => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/debts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            body: JSON.stringify({ household_id: user.household_id.debts }),
          },
        });
        const data = await response.json();
        console.log(data);
        setDebts(data);
      } catch (error) {
        return error.response.data.error;
      }
    };
    token && updateDebts(token)
  }, [user.balance]);
  // Redirect to login if user is not logged in and on a protected page
  if (!user && !['/', '/signup'].includes(location.pathname)) {
    return <Navigate to='/' />;
  }

  return (
    <>
      <nav className='flex justify-end p-4'>
        {!user &&
          !auth &&
          location.pathname !== '/' && ( // Hide logout button on login page
            <>
              <Link to='/'>Login</Link>
              <Link to='/signup'>Signup</Link>
            </>
          )}
        {user &&
          auth &&
          location.pathname !== '/' && ( // Show logout button when logged in
            <div className='flex items-center space-x-2'>
              <button
                className='btn-door flex items-center space-x-2 mr-12'
                onClick={handleLogout}
              >
                <img
                  src='../src/assets/LogoutClicked.svg'
                  alt='Logout'
                  className='w-10 h-10'
                />
                <h1 className='text-white'>Logout</h1>
              </button>
            </div>
          )}
      </nav>

      <Routes>
        <Route
          path='/'
          element={
            <Login
              auth={auth}
              setAuth={setAuth}
              user={user}
              setUser={setUser}
            />
          }
        />
        <Route
          path='/signup'
          element={
            <Signup
              auth={auth}
              setAuth={setAuth}
              user={user}
              setUser={setUser}
            />
          }
        />

        <Route path='/auth' element={<RequireLogin auth={auth} />}>
          <Route
            path={'/auth/home'}
            element={
              user ? <Home user={user} token={token} /> : <Navigate to='/' />
            }
          />
          <Route
            path='/auth/shoppingpage'
            element={<ShoppingPage user={user} token={token} />}
          />
          <Route
            path='/auth/add-household'
            element={<AddHousehold user={user} token={token} />}
          />
          <Route
            path='/auth/search-household'
            element={<SearchHousehold user={user} token={token} />}
          />
          <Route
            path='/auth/balancepage'
            element={<BalancePage user={user} token={token} />}
          />
          <Route
            path='/auth/personal-balance'
            element={<PersonalBalance user={user} token={token} debts={debts} />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
