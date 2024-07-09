import { useState } from 'react';
import axios from 'axios';
import SignupImage from '../assets/Signin_background.svg';
import { Navigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import the eye icons

const RegisterForm = ({ auth, setAuth, user, setUser, setToken }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility
  const [success, setSuccess] = useState(false);

  const toggleVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        {
          username,
          email,
          password,
        }
      );
      const data = response.data;
      console.log(data);
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.currentUser);
      setAuth(true);
      setSuccess(true);
    } catch (error) {
      console.error(
        'Registration failed:',
        error.response?.data || error.message
      );
      setSuccess(false);
    }
  };
  if (auth && user) return <Navigate to='/auth/home' />;
  return (
    <div className='logincontainerouter'>
      <div className='logincontainer shadow-xl'>
        <div className='loginform'>
          {success ? (
            <div>
              <p>Registration successful! You can now login.</p>
            </div>
          ) : (
            <>
              <h1 className='text-center'>Sign up</h1>
              <form
                onSubmit={handleSubmit}
                className='form-container flex flex-col gap-8'
              >
                <input
                  type='text'
                  placeholder='Username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className='input input-bordered sm:w-96 bg-base-200'
                />
                <input
                  type='email'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='input input-bordered sm:w-96 bg-base-200'
                />
                <div className='relative'>
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='input input-bordered sm:w-96 bg-base-200 pr-10'
                  />
                  <button
                    type='button'
                    onClick={toggleVisibility}
                    className='absolute right-2 top-1/2 transform -translate-y-1/2'
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <button type='submit' className='btn-see'>
                  Register
                </button>
              </form>
              <div className='mt-4'>
                <p className='text-sm mt-4'>Already a member? </p>
                <Link to='/' className='text-blue-500 underline'>
                  Login
                </Link>
              </div>
            </>
          )}
        </div>
        <img className='signup-image' src={SignupImage} alt='Signup Visual' />
      </div>
    </div>
  );
};

export default RegisterForm;
