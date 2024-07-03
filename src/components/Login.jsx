import {useState } from "react"
import { useNavigate, Navigate, Link} from "react-router-dom"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import LoginImage from '../assets/imageforlogin.png';


const Login = ({ user, setUser }) => {
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
   if(user) return <Navigate to="/home" />
   
   
   return (
      <div class ="logincontainerouter">
      <div class="logincontainer">
        <img src={LoginImage} alt="Login Visual" />

        {/* <div className="flex flex-col sm:py-36 py-24 sm:px-52 px-4 w-full sm:w-[50%] items-center" > */}

        <div className="loginform">
        <h1 className="mb-12"> Balanced</h1>
        <p className="text-xl mb-10">Log in</p>
        <form 
        className="flex flex-col items-center gap-8"
       onSubmit={handleSubmit}>
        
        <div className="relative">
        
        <input className="input input-bordered sm:w-96 bg-base-200" placeholder="Email" type='text' name='email' id='email' value={formValues.email} onChange={handleInput} />
        </div>

        <div className="relative">
        <label htmlFor='password'></label>
        
        <input 
    className="input input-bordered sm:w-96 bg-base-200 pr-10" // Add pr-10 to give space for the icon
    type={passwordVisible ? "text" : "password"} 
    placeholder="Password"  
    name='password' 
    id='password' 
    value={formValues.password} 
    onChange={handleInput} 
  />
  <button
    type="button"
    onClick={toggleVisibility}
    className="absolute right-2 top-1/2 transform -translate-y-1/2" // Adjust the position to be vertically centered
  >
    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
  </button>
</div>
        
       
        <button disabled={loading} class="btn-see">Login</button>
         
       
        {error && <p>{error}</p>}
      </form>
      <p className="mt-4">
              New here? <Link to="/signup" className="text-blue-500 underline">Sign up</Link>
            </p>
      </div>

      </div>

      </div>
    );
  };
  
  export default Login;
