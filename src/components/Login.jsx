import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import LoginImage from '../assets/login_background.svg';

const Login = ({ auth, setAuth, user, setUser, setToken }) => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const toggleVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.currentUser.username); //store the username
      setAuth(true);
      setUser(data.currentUser);
      setToken(data.token);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  if (auth && user) return <Navigate to='/auth/home' />;

  return (
    <div className='logincontainerouter'>
      <div className='logincontainer shadow-xl'>
        <img src={LoginImage} alt='Login Visual' />
        <div className='loginform'>
          <h1 className='text-xl mb-10'>Log in</h1>
          <form
            className='form-container flex flex-col items-center gap-8'
            onSubmit={handleSubmit}
          >
            <div className='relative'>
              <input
                className='input input-bordered sm:w-96 bg-base-200'
                placeholder='Email'
                type='text'
                name='email'
                id='email'
                value={formValues.email}
                onChange={handleInput}
              />
            </div>

            <div className='relative'>
              <label htmlFor='password'></label>

              <input
                className='input input-bordered sm:w-96 bg-base-200 pr-10' // Add pr-10 to give space for the icon
                type={passwordVisible ? 'text' : 'password'}
                placeholder='Password'
                name='password'
                id='password'
                value={formValues.password}
                onChange={handleInput}
              />
              <button
                type='button'
                onClick={toggleVisibility}
                className=' absolute right-2 top-1/2 transform -translate-y-1/2' // Adjust the position to be vertically centered
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button disabled={loading} className='btn-see'>
              Login
            </button>

            {error && <p>{error}</p>}
          </form>
          <p className='mt-4'>
            New here?{' '}
            <Link to='/signup' className='text-blue-500 underline'>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
