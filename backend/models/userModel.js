import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile_number: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true }
})

export default mongoose.model('User', userSchema)
