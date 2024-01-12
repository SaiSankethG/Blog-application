import { useState } from 'react'
import './register.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Register() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setError(false);
    try{
      const res = await axios.post("http://localhost:5000/api/auth/register" , {
        username,
        email,
        password,
      })
      console.log(res.data)
      res.data && window.location.replace("/login")
    }catch(err){
      setError(true)
    }
  }

  return (
    <div className='register'>
        <span className="registerTitle">Register</span>
        <form className="registerForm" onSubmit={handleSubmit}>
            <label>Username</label>
            <input type='text' placeholder='Enter your username...' onChange={(e) => setUsername(e.target.value)}></input>
            <label>Email</label>
            <input type='text' placeholder='Enter your email...' onChange={(e)=> setEmail(e.target.value)}></input>
            <label>Password</label>
            <input type='password' placeholder='Enter your password' onChange={(e)=> setPassword(e.target.value)}></input>
            <button className="registerButton" type='submit'>Register</button>
        </form>
        <button className="registerLoginButton">
          <Link to="/login" className='link'>Login</Link> 
        </button>
        {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
    </div>
  )
}
