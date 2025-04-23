import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import Header from '../Header'
import Footer from '../Footer'
import { LoadingView, FailureView } from '../LoadingAndError'

import './index.css'

const Home = () => {
  const [activeTab, setActiveTab] = useState("Buses")
  const [transportOptions, setTransportOptions] = useState([])
  const [apiStatus, setApiStatus] = useState('in_progress')

  const navigate=useNavigate()

  useEffect(() => {
    axios.get('http://localhost:4000/api/vehicles/')
      .then(res => {
        const updatedData = res.data.map((vehicle) => ({
          category: vehicle.category,
          vehicleId: vehicle.vehicle_id,
          type: vehicle.type,
          capacity: vehicle.capacity,
          price: vehicle.price,
        }))
        setTransportOptions(updatedData)
        setApiStatus('success')
      })
      .catch(error => {
        console.error("Error fetching data:", error)
        setApiStatus('error')
      })
  }, [])

  const redirectToBooking = (vehicleCategory, vehicleId, capacity,price)=>{
    navigate('/booking',{ state: { vehicleCategory, vehicleId, capacity, price } })
  }

  const renderVehiclesView = () => (
    <div className="home-transport-options">
      {transportOptions.map((option, index) => (
        option.category === activeTab && (
          <div className="home-transport-card" key={index}>
            <h3>{option.type}</h3>
            <p>Capacity: {option.capacity} | Price: Rs {option.price}</p>
            <button onClick={()=>redirectToBooking(option.category,option.vehicleId,option.capacity,option.price)}>Select</button>
          </div>
        )
      ))}
    </div>
  )

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
          <div className="home-tabs">
            <button className={activeTab === "Buses" ? "active" : ""} onClick={() => setActiveTab("Buses")}>Buses</button>
            <button className={activeTab === "Tempos" ? "active" : ""} onClick={() => setActiveTab("Tempos")}>Tempos</button>
            <button className={activeTab === "Cabs" ? "active" : ""} onClick={() => setActiveTab("Cabs")}>Cabs</button>
            <button className={activeTab === "Rentals" ? "active" : ""} onClick={() => setActiveTab("Rentals")}>Rentals</button>
          </div>
          {(activeTab === 'Rentals' || activeTab === 'Bikes' || activeTab === 'Cars' || activeTab === 'Trekking_Items') && (
            <div className="home-tabs" style={{ marginTop: '0px' }}>
              <button className={activeTab === "Bikes" ? "active" : ""} onClick={() => setActiveTab("Bikes")}>Bikes</button>
              <button className={activeTab === "Cars" ? "active" : ""} onClick={() => setActiveTab("Cars")}>Cars</button>
              <button className={activeTab === "Trekking_Items" ? "active" : ""} onClick={() => setActiveTab("Trekking_Items")}>Trekking Items</button>
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
