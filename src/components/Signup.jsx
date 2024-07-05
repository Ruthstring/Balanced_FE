import React, { useState } from 'react';
import axios from 'axios';
import SignupImage from '../assets/Signin_background.svg';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import the eye icons

const RegisterForm = () => {
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
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password
      });
      console.log('Registration successful:', response.data);
      setSuccess(true); 
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
      setSuccess(false);
    }
  };

  return (
    <div className="logincontainerouter">
      <div className="logincontainer shadow-xl">
        <div className="loginform">
          {success ? (
            <div>
              <p>Registration successful! You can now login.</p>
            </div>
          ) : (
            <>
              <h1 className="text-center">Sign up</h1>
              <form onSubmit={handleSubmit} className="form-container flex flex-col gap-8">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input input-bordered sm:w-96 bg-base-200"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered sm:w-96 bg-base-200"
                />
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input input-bordered sm:w-96 bg-base-200 pr-10"
                  />
                  <button
                    type="button"
                    onClick={toggleVisibility}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <button type="submit" className="btn-see">Register</button>
              </form>
              <p className="mt-4">
                <p className="text-sm mt-4">Already a member? </p><Link to="/" className="text-blue-500 underline">Login</Link>
              </p>
            </>
          )}
        </div>
        <img className="signup-image" src={SignupImage} alt="Signup Visual" />
      </div>
    </div>
  );
};

export default RegisterForm;


// import React, { useState } from 'react';
// import axios from 'axios';
// import SignupImage from "../assets/imageforlogin.png";
// import { useNavigate, Navigate, Link} from "react-router-dom"

// const RegisterForm = () => {
//   const [email, setEmail] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [success, setSuccess] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/register', { username, email, password });
//       console.log('Registration successful:', response.data);
//       //to redirect to login page or handle success message
//       setSuccess(true); 
//     } catch (error) {
//       console.error('Registration failed:', error.response.data);
//       // Handle error, e.g., display error message to user
//       setSuccess(false);
//     }
//   };



// return (
//   <div className="logincontainerouter">
//     <div className="logincontainer shadow-xl">
     
//       <div className="loginform">
//         {/* <h1 className="mb-12">Balanced</h1>
//         <p className="text-xl mt-4">New here? Register for free </p> */}
//         {success ? (
//           <div>
//             <p>Registration successful! You can now login.</p>
//             {/* <button onClick={() => window.location.href = '/login'}>Go to Login</button> */}
//           </div>
//         ) : (
//           <>
//             <p className="text-center">Sign up</p>
//             <form onSubmit={handleSubmit} className="form-container flex flex-col items-center gap-8">
//               <input
//                 type="text"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="input input-bordered sm:w-96 bg-base-200"
//               />
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="input input-bordered sm:w-96 bg-base-200"
//               />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="input input-bordered sm:w-96 bg-base-200"
//               />
//               <button type="submit" className="btn-see">Register</button>
//             </form>
//             <p className="mt-4">
//               Already a member? <Link to="/" className="text-blue-500 underline">Login</Link>
//             </p>
//           </>
//         )}
//       </div>
//       <img src={SignupImage} alt="Signup Visual" />
//     </div>
//   </div>
// );
// };

// export default RegisterForm;