import React, { useState } from 'react';
import axios from 'axios';
import SignupImage from "../assets/imageforlogin.png";
import { useNavigate, Navigate, Link} from "react-router-dom"

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { username, email, password });
      console.log('Registration successful:', response.data);
      //to redirect to login page or handle success message
      setSuccess(true); 
    } catch (error) {
      console.error('Registration failed:', error.response.data);
      // Handle error, e.g., display error message to user
      setSuccess(false);
    }
  };



return (
  <div className="logincontainerouter">
    <div className="logincontainer">
      <img src={SignupImage} alt="Signup Visual" />

      <div className="loginform">
        <h1 className="mb-12">Balanced</h1>
        <p className="text-xl mt-4">New here? Register for free </p>
        {success ? (
          <div>
            <p>Registration successful! You can now login.</p>
            {/* <button onClick={() => window.location.href = '/login'}>Go to Login</button> */}
          </div>
        ) : (
          <>
            <p className="text-center">Sign up</p>
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-8">
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input input-bordered sm:w-96 bg-base-200"
              />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered sm:w-96 bg-base-200"
              />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered sm:w-96 bg-base-200"
              />
              <button type="submit" className="btn-see">Register</button>
            </form>
            <p className="mt-4">
              Already a member? <Link to="/" className="text-blue-500 underline">Login</Link>
            </p>
          </>
        )}
      </div>
    </div>
  </div>
);
};

export default RegisterForm;