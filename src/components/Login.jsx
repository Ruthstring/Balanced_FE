import React, {useState } from "react"
import { useNavigate} from "react-router-dom"
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = ({ setUser }) => {
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
  
    const navigate = useNavigate();
  
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
        console.log('Token received:', data.token)

        localStorage.setItem('token', data.token);
        localStorage.setItem("username",data.username);//store the username
        console.log(data);
        setUser(true);
        navigate('/home');
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    return (
        <div className="flex flex-col sm:py-36 py-24 sm:px-52 px-4 w-full sm:w-[50%] items-center" >
      <form 
        className="flex flex-col items-center gap-8"
       onSubmit={handleSubmit}>
        <h1>Log in</h1>
        <label htmlFor='email'>Email</label>
        <input className="input input-bordered sm:w-96 bg-base-200" placeholder="email" type='text' name='email' id='email' value={formValues.email} onChange={handleInput} />
      
        <div className="relative">
        <label htmlFor='password'>Password</label>
        <input className="input input-bordered sm:w-96  bg-base-200" type={passwordVisible ? "text" : "password"} placeholder="Password"  name='password' id='password' value={formValues.password} onChange={handleInput} /> 
        <button
        type="button"
        onClick={toggleVisibility}
        className="absolute right-2 top-10 transform -translate-y-1/2"
        >
        {passwordVisible ? <FaEyeSlash /> : <FaEye />}
        </button>
       
       </div>
        <button disabled={loading}>Login</button>
         
       
        {error && <p>{error}</p>}
      </form>
      </div>
    );
  };
  
  export default Login;