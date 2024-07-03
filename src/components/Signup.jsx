import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        { username, email, password }
      );
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
    <>
    <div class ="logincontainerouter">

    <div class="logincontainer">

    <p className="text-xl mb-10">Sign up</p>
    
    {success ? (
        <div>
          <p>Registration successful! You can now login.</p>
          {/* <button onClick={() => window.location.href = '/login'}>Go to Login</button> */}
        </div>
      ) : (
        <>
        
        <p className="flex flex-col items-center gap-8">New here? Register for free</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Register</button>
        </form>
        </>
      )}
    
    </div>
    </div>
    </>
  );
};

export default RegisterForm;
