import mongoose from "mongoose"

const travelBookingSchema = new mongoose.Schema({
  user: { type: String, required: true },
  name: { type: String, required: true },
  mobile_number: { type: String, required: true },
  vehicle_id: { type: Number, required: true },
  vehicle_type: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  passengers: { type: Number, required: true },
  date: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, required: true }
})

const rentalBookingSchema = new mongoose.Schema({
  user: { type: String, required: true },
  name: { type: String, required: true },
  mobile_number: { type: String, required: true },
  vehicle_id: { type: Number, required: true },
  vehicle_type: { type: String, required: true },
  rented_date: { type: String, required: true },
  no_of_days: { type: Number, required: true },
  amount: { type: Number, required: true },
  status: { type: String, required: true }
})

export const TravelBooking = mongoose.model('TravelBooking', travelBookingSchema, 'travel_bookings')
export const RentalBooking = mongoose.model('RentalBooking', rentalBookingSchema, 'rental_bookings')
