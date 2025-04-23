import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema({
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

export default mongoose.model('Booking', bookingSchema)
