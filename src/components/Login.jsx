import React, {useState } from "react"
import { useNavigate} from "react-router-dom"


const Login = ({ setUser }) => {
    const [formValues, setFormValues] = useState({
      email: '',
      password: '',
    });
  
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
        
        setUser(true);
        navigate('/home');
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <h2>Log in</h2>
        <label htmlFor='email'>Email</label>
        <input type='text' name='email' id='email' value={formValues.email} onChange={handleInput} />
        <br />
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' id='password' value={formValues.password} onChange={handleInput} /> <br />
        <button disabled={loading}>Login</button>
        {error && <p>{error}</p>}
      </form>
    );
  };
  
  export default Login;