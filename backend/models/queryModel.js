import mongoose from "mongoose"

const querySchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile_number: { type: String, required: true },
  query: { type: String, required: true }
})

export default mongoose.model('Query', querySchema)