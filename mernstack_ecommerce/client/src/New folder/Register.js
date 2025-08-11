import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Auth.css'

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  })

  const onChangeInput = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const registerSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post('/user/register', { ...user })
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
            <h2>Create Account</h2>
            <p>Join us today and get started</p>
          </div>
          
          <form onSubmit={registerSubmit} className="auth-form">
            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={user.name}
                onChange={onChangeInput}
                placeholder="Enter your full name"
                required
                className="form-input"
              />
            </div>
            
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
                placeholder="Create a password"
                required
                className="form-input"
              />
            </div>
            
            <button type="submit" className="auth-btn primary">
              Create Account
            </button>
          </form>
          
          <div className="auth-footer">
            <p>Already have an account? 
              <Link to="/login" className="auth-link">Sign in here</Link>
            </p>
          </div>
          
        </div>
        <p>This website is developed by <a href='https://sourabhnateria.vercel.app/'><p className='Admin'>Sourabh Nateria</p></a></p>
      </div>
      
    </div>
    
  )
}

export default Register
