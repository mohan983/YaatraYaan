import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useNavigate,useLocation } from 'react-router-dom'

import { LoadingView, FailureView } from '../LoadingAndError'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const BookingPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    from: '',
    to: '',
    travelDate: new Date(),
    passengers: null,
    amount: null
  })
  const [bookingApiStatus, setBookingApiStatus] = useState(null)
  const navigate = useNavigate()
  const location=useLocation()
  const { vehicleCategory, vehicleId, capacity, price } = location.state

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleDateChange = (date) => {
    setFormData((prevData) => ({ ...prevData, travelDate: date }))
  }

  const handlePassengersChange =(e)=>{
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value , amount: value*price}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setBookingApiStatus('in_progress')
    const user = Cookies.get('username')

    try {
      const response = await axios.post(
        'https://script.google.com/macros/s/AKfycbxm6jc0CnGI1FMaN8Am9JYQLTGWFJ_MCcTVEdGagMFyXyfS07o3JAGCkipMNNZPmRq9gg/exec?action=addBooking',
        JSON.stringify({
          User: user,
          Name: formData.name,
          Mobile_Number: formData.mobileNumber,
          Vehicle_Id: vehicleId,
          Vehicle_Type: vehicleCategory,
          From: formData.from,
          To: formData.to,
          Passengers: formData.passengers,
          Date: formData.travelDate,
          Amount: formData.amount,
          Status: 'Pending'
        })
      )

      setBookingApiStatus('success')
      if (response.data === 'Success') {
        alert('Successfully Booked')
        navigate('/')
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      setBookingApiStatus('failure')
    }
  }

  const renderForm = () => (
    <form className="booking-form" onSubmit={handleSubmit}>
      {['name', 'mobileNumber', 'from', 'to'].map((field) => (
        <input
          key={field}
          type="text"
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={formData[field]}
          onChange={handleChange}
          required
        />
      ))}
      <DatePicker
        selected={formData.travelDate}
        onChange={handleDateChange}
        placeholderText="Pick a date"
        className="date-picker"
        required
      />
      <input
        type="number"
        name="passengers"
        placeholder="Total Passengers"
        value={formData.passengers}
        onChange={handlePassengersChange}
        min={vehicleCategory==='Tempos'?capacity:1}
        max={capacity}
        required
      />
      <input
        type="number"
        name="amount"
        placeholder="Total Amount"
        value={formData.amount}
      />
      <button type="submit" className="submit-button">Confirm Booking</button>
    </form>
  )

  const renderContent = () => {
    if (bookingApiStatus === 'in_progress') return <LoadingView />
    if (bookingApiStatus === 'failure') return <FailureView />
    return renderForm()
  }

  return (
    <>
      <Header />
      <div className="booking-page" style={{ backgroundImage: 'url("./images/background-image.png")' }}>
        <h2 className="booking-title">Book Your Travel</h2>
        {renderContent()}
      </div>
      <Footer />
    </>
  )
}

export default BookingPage
