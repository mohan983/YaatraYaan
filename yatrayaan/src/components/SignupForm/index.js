import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { LoadingView, FailureView } from '../LoadingAndError'
import './index.css'

const SignupForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    mobile_num: '',
    email: '',
    address: '',
    gender: 'male',
    username: '',
    password: '',
    confirm_password: ''
  });
  const [signupApiStatus, setSignupApiStatus] = useState('')

  const onSubmitSuccess = async () => {
    setSignupApiStatus('in_progress')

    try {
      const response = await axios.post(
        'http://localhost:4000/api/users/add',
        {
          name: formData.name,
          mobile_number: formData.mobile_num,
          email: formData.email,
          address: formData.address,
          gender: formData.gender,
          username: formData.username,
          password: formData.password
        }
      )

      console.log(response.data.success)

      setSignupApiStatus('success')

      if (response.data.success) {
        alert('✅ Registration Successful! Redirecting to Login...')
        navigate('/login')
      } 

    } catch (error) {
      console.error("Error fetching data:", error)
      if (error.status && error.response.status === 400) {
        alert('⚠️ Username already exists. Please use a different one.');
        setSignupApiStatus('');
      } else {
        setSignupApiStatus('failure');
      }
    }
  };

  const submitSignupForm = (event) => {
    event.preventDefault()
    if (formData.password === formData.confirm_password) {
      onSubmitSuccess()
    } else {
      alert('Password did not match!');
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData((prevData) => ({ ...prevData, [id]: value }))
  };

  const renderField = (label, id, type = 'text', required = false) => (
    <>
      <label className="signup-input-label" htmlFor={id}>
        {label.toUpperCase()}
      </label>
      <input
        type={type}
        id={id}
        className="signup-input-field"
        value={formData[id]}
        onChange={handleInputChange}
        placeholder={label}
        required={required}
      />
    </>
  )

  const renderGenderField = () => (
    <>
      <h1 className="signup-input-label">GENDER</h1>
      <div className="signup-gender-container">
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={formData.gender === 'male'}
            onChange={handleInputChange}
          />
          <span style={{ marginRight: '5px' }}>Male</span>
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={formData.gender === 'female'}
            onChange={handleInputChange}
          />
          <span>Female</span>
        </label>
      </div>
    </>
  )

  const renderSignupForm = () => (
    <form className="signup-form-container" onSubmit={submitSignupForm}>
      <div className="signup-logo-container">
        <img src="./images/logo.png" className="signup-logo-img" alt="website logo" />
        <h1 className="signup-logo-name">YatraYaan</h1>
      </div>
      <div className="signup-input-container">{renderField('Name', 'name', 'text', true)}</div>
      <div className="signup-input-container">{renderField('Mobile Number', 'mobile_num', 'tel', true)}</div>
      <div className="signup-input-container">{renderField('Address', 'address', 'text', true)}</div>
      <div className="signup-input-container">{renderField('Email', 'email')}</div>
      <div className="signup-input-container">{renderGenderField()}</div>
      <div className="signup-input-container">{renderField('Username', 'username', 'text', true)}</div>
      <div className="signup-input-container">{renderField('Password', 'password', 'password', true)}</div>
      <div className="signup-input-container">{renderField('Confirm Password', 'confirm_password', 'password', true)}</div>
      <button type="submit" className="signup-button">Signup</button>
    </form>
  )

  const renderSignup = () => {
    switch (signupApiStatus) {
      case 'success':
        return renderSignupForm();
      case 'failure':
        return <FailureView />;
      case 'in_progress':
        return <LoadingView />;
      default:
        return renderSignupForm();
    }
  }

  return (
    <div className="signup-container" style={{ backgroundImage: 'url("./images/background-image.png")' }}>
      {renderSignup()}
    </div>
  )
}

export default SignupForm
