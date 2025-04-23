import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'
import { LoadingView, FailureView } from '../LoadingAndError'
import './index.css'

const MyBookings = ()=> {
  const [myBookings, setMyBookings] = useState([])
  const [apiStatus, setApiStatus] = useState('in_progress')

  const navigate=useNavigate()

  useEffect(() => {
    const Username=Cookies.get('username')
    axios.get(`http://localhost:4000/api/bookings?user=${Username}`)
      .then(res => {
        const updatedData = res.data.map((booking) => ({
          transport: booking.vehicle_type,
          from: booking.from,
          to: booking.to,
          date: booking.date,
          tickets: booking.passengers,
          amount: booking.amount,
          status: booking.status
        }));
        setMyBookings(updatedData)
        setApiStatus('success')
      })
      .catch(error => {
        console.error("Error fetching data:", error)
        setApiStatus('failure')
      })
  }, [])

  const renderBookingsView = () => (
  myBookings.length !== 0 ? (
    <div className="bookings-table-container">
      <table>
        <thead>
          <tr>
            <th>Transport</th>
            <th>From</th>
            <th>To</th>
            <th>Date</th>
            <th>Passengers</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {myBookings.map((booking, index) => (
            <tr key={index}>
              <td>{booking.transport}</td>
              <td>{booking.from}</td>
              <td>{booking.to}</td>
              <td>{booking.date}</td>
              <td>{booking.tickets}</td>
              <td>{booking.amount}</td>
              <td className={booking.status.toLowerCase()}>{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ color: 'black', marginBottom: '10px' }}>No Bookings</h3>
      <button className="book-btn" onClick={() => navigate('/')}>Book</button>
    </div>
  )
);


  const renderAllBookings = () => {
    switch (apiStatus) {
      case 'success':
        return renderBookingsView()
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
      <div className="bookings-container" style={{backgroundImage: 'url("./images/background-image.png")'}}>
        <div className="bookings-content">
          <h2 style={{color: '#005f8a', marginBottom: '10px'}}>My Bookings</h2>
          <p>View your current and past bookings</p>
          {renderAllBookings()}
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default MyBookings
