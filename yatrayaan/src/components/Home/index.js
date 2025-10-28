import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from '../Header'
import Footer from '../Footer'
import { LoadingView, FailureView } from '../LoadingAndError'
import './index.css'

const Home = () => {
  const [activeTab, setActiveTab] = useState("Buses")
  const [rentalCategory, setRentalCategory] = useState("Bikes")
  const [transportOptions, setTransportOptions] = useState([])
  const [apiStatus, setApiStatus] = useState('in_progress')

  const navigate = useNavigate()

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [vehiclesRes, rentalsRes] = await Promise.all([
          axios.get('http://localhost:4000/api/vehicles/'),
          axios.get('http://localhost:4000/api/rentals/')
        ])

        const vehicleData = vehiclesRes.data.map((v) => ({
          category: v.category,
          vehicleId: v.vehicle_id,
          type: v.type,
          capacity: v.capacity,
          price: v.price
        }))

        const rentalData = rentalsRes.data.map((r) => ({
          category: r.category,
          vehicleId: r.vehicle_id || null,
          type: r.type,
          capacity: r.capacity || null,
          price: r.price
        }))

        setTransportOptions([...vehicleData, ...rentalData])
        setApiStatus('success')
      } catch (error) {
        console.error("Error fetching data:", error)
        setApiStatus('error')
      }
    }

    fetchAllData()
  }, [])

  const redirectToBooking = (vehicleCategory, vehicleId, capacity, price) => {
    navigate('/booking', { state: { vehicleCategory, vehicleId, capacity, price } })
  }

  const renderVehiclesView = () => {
    const filterCategory = activeTab === "Rentals" ? rentalCategory : activeTab

    return (
      <div className="home-transport-options">
        {transportOptions.map((option, index) => (
          option.category === filterCategory && (
            <div className="home-transport-card" key={index}>
              <h3>{option.type}</h3>
              <p>
                {option.capacity && option.capacity !== 0
                  ? <>Capacity: {option.capacity} | </>
                  : null}
                Price: Rs {option.price}
              </p>
              <button onClick={() => redirectToBooking(option.category, option.vehicleId, option.capacity, option.price)}>
                Select
              </button>
            </div>
          )
        ))}
      </div>
    )
  }

  const renderAllVehicles = () => {
    switch (apiStatus) {
      case 'success':
        return renderVehiclesView()
      case 'error':
        return <div className='vehicles-error-view-container'><FailureView /></div>
      case 'in_progress':
        return <div className='vehicles-loader-container'><LoadingView /></div>
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <div className="home-container" style={{ backgroundImage: 'url("./images/background-image.png")' }}>
        <div className="home-content">
          <h2 style={{ color: '#005f8a' }}>Choose Your Transport</h2>
          <p>Select from available options for your journey</p>

          {/* --- Transport Type Tabs --- */}
          <div className="home-tabs">
            <button className={activeTab === "Buses" ? "active" : ""} onClick={() => setActiveTab("Buses")}>Buses</button>
            <button className={activeTab === "Tempos" ? "active" : ""} onClick={() => setActiveTab("Tempos")}>Tempos</button>
            <button className={activeTab === "Cabs" ? "active" : ""} onClick={() => setActiveTab("Cabs")}>Cabs</button>
            <button className={activeTab === "Rentals" ? "active" : ""} onClick={() => setActiveTab("Rentals")}>Rentals</button>
          </div>

          {/* --- Rentals Dropdown --- */}
          {activeTab === 'Rentals' && (
            <div className="rental-selector">
              <label htmlFor="rentalType">Choose Rental Type:</label>
              <select
                id="rentalType"
                value={rentalCategory}
                onChange={(e) => setRentalCategory(e.target.value)}
              >
                <option value="Bikes">Bikes</option>
                <option value="Cars">Cars</option>
                <option value="Trekking Items">Trekking Items</option>
              </select>
            </div>
          )}

          {renderAllVehicles()}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home
