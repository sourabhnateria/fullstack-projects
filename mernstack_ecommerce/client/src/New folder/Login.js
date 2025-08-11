import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './Auth.css'

const Login = () => {
  const [user,setUser] = useState({
    email:'',
    password:''
  })

  const onChangeInput = (e) =>{
    const {name, value} = e.target
    setUser({...user, [name]: value})
  }

  const loginSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post('/user/login', {...user})
      localStorage.setItem('firstLogin', true)
      window.location.href = '/'
    } catch (error) {
      alert(error.response.data.msg)
    }
  }
  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Welcome Back</h2>
            <p>Please sign in to your account</p>
          </div>
          
          <form onSubmit={loginSubmit} className="auth-form">
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={onChangeInput}
                placeholder="Enter your email"
                required
                className="form-input"
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={user.password}
                onChange={onChangeInput}
                placeholder="Enter your password"
                required
                className="form-input"
              />
            </div>
            
            <button type="submit" className="auth-btn primary">
              Sign In
            </button>
          </form>
          
          <div className="auth-footer">
            <p>Don't have an account? 
              <Link to="/register" className="auth-link">Sign up here</Link>
            </p>
          </div>
        </div>
        <p>This website is developed by <a href='https://sourabhnateria.vercel.app/'><p className='Admin'>Sourabh Nateria</p></a></p>
      </div>
      
    </div>
  )
}

export default Login