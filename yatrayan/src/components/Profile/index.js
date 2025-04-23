import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'
import { LoadingView, FailureView } from '../LoadingAndError'
import './index.css'

const Profile = ()=> {
  const [myProfile, setMyProfile] = useState([])
  const [apiStatus, setApiStatus] = useState('in_progress')


  useEffect(() => {
    const Username=Cookies.get('username')
    axios.get(`http://localhost:4000/api/users?user=${Username}`)
      .then(res => {
        const user=res.data
        const updatedUserData = {name: user.name,
          contact: user.mobile_number,
          email: user.email,
          gender: user.gender,
          username: user.username,
          address: user.address,}
        setMyProfile(updatedUserData)
        setApiStatus('success')
      })
      .catch(error => {
        console.error("Error fetching data:", error)
        setApiStatus('failure')
      })
  }, [])

  const renderProfileView = () => (
    <>
        <div className="profile-header">
        <img src={myProfile.gender === 'male' ? '/images/men_profile.png' : '/images/women_profile.png'} alt="Profile" className="profile-image" />

          <h2 className="profile-name">{myProfile.name}</h2>
        </div>
        
        <div className="profile-details">
          <h3>Personal Information</h3>
          <p><strong>Username:</strong> {myProfile.username}</p>
          <p><strong>Phone:</strong> {myProfile.contact}</p>
          <p><strong>Email:</strong> {myProfile.email}</p>
          <p><strong>Address:</strong> {myProfile.address}</p>
        </div>

        <button className="edit-button">Edit Profile</button>
    </>
  )

  const renderMyProfile = () => {
    switch (apiStatus) {
      case 'success':
        return renderProfileView()
      case 'failure':
        return <FailureView/>
      case 'in_progress':
        return <div className='bookings-loader-container'><LoadingView /></div>
      default:
        return null
    }
  }

  return (
    <>
      <Header/>
      <div className="profile-container" style={{ backgroundImage: 'url("./images/background-image.png")' }}>
        <div className="profile-box">
          {renderMyProfile()}
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Profile