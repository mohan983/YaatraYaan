import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  category: { type: String, required: true },
  type: { type: String, required: true },
  vehicle_id: { type: Number, required: true },
  capacity: { type: Number, required: true },
  price: { type: Number, required: true },
  driver: { type: String, required: true },
  operator: {type: String, required: true},
  contact: { type: String, required: true }
})

export default mongoose.model('Vehicle', vehicleSchema)
