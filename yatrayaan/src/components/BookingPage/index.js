import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'

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
    rentedDate: new Date(),
    days: null,
    amount: null
  })
  const [bookingApiStatus, setBookingApiStatus] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const { vehicleCategory, vehicleId, capacity, price } = location.state

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, travelDate: date }))
  }

  const handleRentedDateChange = (date) => {
    setFormData((prev) => ({ ...prev, rentedDate: date }))
  }

  const handlePassengersChange = (e) => {
    const { value } = e.target
    setFormData((prev) => ({ ...prev, passengers: value, amount: value * price }))
  }

  const handleDaysChange = (e) => {
    const days = Number(e.target.value)
    setFormData((prev) => ({ ...prev, days, amount: days * price }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setBookingApiStatus('in_progress')
    const user = Cookies.get('username')

    const bookingPayload =
      ['Bikes', 'Cars', 'Trekking Items'].includes(vehicleCategory)
        ? {
            user,
            name: formData.name,
            mobile_number: formData.mobileNumber,
            vehicle_id: vehicleId,
            vehicle_type: vehicleCategory,
            rented_date: formData.rentedDate,
            no_of_days: formData.days,
            amount: formData.amount,
            status: 'Pending'
          }
        : {
            user,
            name: formData.name,
            mobile_number: formData.mobileNumber,
            vehicle_id: vehicleId,
            vehicle_type: vehicleCategory,
            from: formData.from,
            to: formData.to,
            passengers: formData.passengers,
            date: formData.travelDate,
            amount: formData.amount,
            status: 'Pending'
          }

    try {
      const response = await axios.post('http://localhost:4000/api/bookings/add', bookingPayload)
      setBookingApiStatus('success')
      if (response.data.success) {
        alert('Successfully Booked')
        navigate('/')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setBookingApiStatus('failure')
    }
  }

  const renderTravelForm = () => (
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
        placeholderText="Pick a travel date"
        className="date-picker"
        required
      />
      {capacity > 0 && (
        <input
          type="number"
          name="passengers"
          placeholder="Total Passengers"
          value={formData.passengers || ''}
          onChange={handlePassengersChange}
          min={vehicleCategory === 'Tempos' ? capacity : 1}
          max={capacity}
          required
        />
      )}
      <input type="number" name="amount" placeholder="Total Amount" value={formData.amount || ''} readOnly />
      <button type="submit" className="submit-button">Confirm Booking</button>
    </form>
  )

  const renderRentalForm = () => (
    <form className="booking-form" onSubmit={handleSubmit}>
      {['name', 'mobileNumber'].map((field) => (
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
        selected={formData.rentedDate}
        onChange={handleRentedDateChange}
        placeholderText="Select Rent Start Date"
        className="date-picker"
        required
      />
      <input
        type="number"
        name="days"
        placeholder="Number of Days"
        value={formData.days}
        onChange={handleDaysChange}
        min={1}
        required
      />
      <input type="number" name="amount" placeholder="Total Price" value={formData.amount || ''} readOnly />
      <button type="submit" className="submit-button">Confirm Rental</button>
    </form>
  )

  const renderContent = () => {
    if (bookingApiStatus === 'in_progress') return <LoadingView />
    if (bookingApiStatus === 'failure') return <FailureView />
    return ['Bikes', 'Cars', 'Trekking Items'].includes(vehicleCategory)
      ? renderRentalForm()
      : renderTravelForm()
  }


  return (
    <>
      <Header />
      <div className="booking-page" style={{ backgroundImage: 'url("./images/background-image.png")' }}>
        <h2 className="booking-title">
          {['Bikes', 'Cars', 'Trekking Items'].includes(vehicleCategory) ? 'Rent Your Vehicle or Gear' : 'Book Your Travel'}
        </h2>
        {renderContent()}
      </div>
      <Footer />
    </>
  )
}

export default BookingPage
