import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'
import { LoadingView, FailureView } from '../LoadingAndError'
import BASE_URL from '../../config'

import './index.css'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showSubmitError, setShowSubmitError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [loginApiStatus, setLoginApiStatus] = useState('')
  const navigate = useNavigate()

  const onSubmitSuccess = () => {
    Cookies.set('username', username, { expires: 365 })
    navigate('/')
  }

  const onSubmitFailure = (message) => {
    setShowSubmitError(true)
    setErrorMsg(message)
  }

  const submitLoginForm = async (event) => {
    event.preventDefault()
    setLoginApiStatus('in_progress')
    
    try {
      const result = await axios.get(`${BASE_URL}/api/users?user=${username}`);
      
      setLoginApiStatus('success')
      if (result.data!==null) {
        result.data.password === password
          ? onSubmitSuccess()
          : onSubmitFailure('Incorrect Password!')
      } else {
        onSubmitFailure('Incorrect Username!')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoginApiStatus('failure')
    }
  }

  const onClickSignup = (e) => {
    e.preventDefault()
    navigate('/signup')
  }

  const renderLoginView = () => (
    <>
      <div className="login-logo-container">
        <img src="./images/logo.png" className="login-website-logo-desktop-img" alt="website logo" />
      </div>
      <form className="login-form-container" onSubmit={submitLoginForm}>
        <h1 className="login-form-heading">Login to Your Account</h1>
        <div className="login-input-container">
          <label className="login-input-label" htmlFor="username">USERNAME</label>
          <input
            type="text"
            id="username"
            className="login-input-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>
        <div className="login-input-container">
          <label className="login-input-label" htmlFor="password">PASSWORD</label>
          <input
            type="password"
            id="password"
            className="login-input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
        {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        <p className="no-account-paragraph">
          Don't have an account? <span className="signup-link" onClick={onClickSignup}>Sign up</span>
        </p>
      </form>
    </>
  )

  const renderLogin = () => {
    switch (loginApiStatus) {
      case 'success':
        return renderLoginView()
      case 'failure':
        return <FailureView />
      case 'in_progress':
        return <LoadingView />
      default:
        return renderLoginView()
    }
  }

  return(
    <div className="login-container" style={{ backgroundImage: 'url("./images/background-image.png")' }}>
      {renderLogin()}
    </div>
  )
}

export default LoginForm