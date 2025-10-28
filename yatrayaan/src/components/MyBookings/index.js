import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'
import { LoadingView, FailureView } from '../LoadingAndError'
import './index.css'

const MyBookings = () => {
  const [myBookings, setMyBookings] = useState([])
  const [apiStatus, setApiStatus] = useState('in_progress')
  const [activeTab, setActiveTab] = useState('Travels')
  const navigate = useNavigate()

  useEffect(() => {
    const Username = Cookies.get('username')
    const bookingType = activeTab.toLowerCase() === 'travels' ? 'travel' : 'rental'

    setApiStatus('in_progress')
    axios
      .get(`http://localhost:4000/api/bookings?user=${Username}&type=${bookingType}`)
      .then(res => {
        const updatedData = res.data.map((booking) => ({
          transport: booking.vehicle_type,
          from: booking.from || '-',
          to: booking.to || '-',
          date: new Date(booking.date || booking.rented_date).toLocaleDateString('en-GB', {  
            day: '2-digit', month: 'short', year: 'numeric'  
          }),
          tickets: booking.passengers || booking.no_of_days || '-',
          amount: booking.amount,
          status: booking.status
        }))
        setMyBookings(updatedData.reverse())
        setApiStatus('success')
      })
      .catch(error => {
        console.error("Error fetching data:", error)
        setApiStatus('failure')
      })
  }, [activeTab])

  const renderBookingsView = () => (
    myBookings.length !== 0 ? (
      <div className="bookings-table-container">
        <div className="responsive-table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Transport</th>
                {activeTab === 'Travels' ? <th>From</th> : null}
                {activeTab === 'Travels' ? <th>To</th> : null}
                <th>{activeTab === 'Travels' ? 'Date' : 'Rented Date'}</th>
                <th>{activeTab === 'Travels' ? 'Passengers' : 'Rented Days'}</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {myBookings.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.transport}</td>
                  {activeTab === 'Travels' ? <td>{booking.from}</td> : null}
                  {activeTab === 'Travels' ? <td>{booking.to}</td> : null}
                  <td>{booking.date}</td>
                  <td>{booking.tickets}</td>
                  <td>{booking.amount}</td>
                  <td className={booking.status.toLowerCase()}>{booking.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ) : (
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ color: 'black', marginBottom: '10px' }}>No Bookings</h3>
        <button className="book-btn" onClick={() => navigate('/')}>Book</button>
      </div>
    )
  )

  const renderAllBookings = () => {
    switch (apiStatus) {
      case 'success':
        return renderBookingsView()
      case 'failure':
        return <FailureView />
      case 'in_progress':
        return <div className='bookings-loader-container'><LoadingView /></div>
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <div className="bookings-container" style={{ backgroundImage: 'url("./images/background-image.png")' }}>
        <div className="bookings-content">
          <div className="bookings-header">
            <h2 style={{ color: '#005f8a', marginBottom: '10px' }}>My Bookings</h2>
            <div className="booking-tabs">
              <select 
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
                className="booking-select"
              >
                <option value="Travels">Travels</option>
                <option value="Rentals">Rentals</option>
              </select>
            </div>
          </div>
          <p>View your current and past {activeTab.toLowerCase()} bookings</p>
          {renderAllBookings()}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default MyBookings
