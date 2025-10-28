import rentalModel from "../models/rentalModel.js"

export const addRental = async (req, res) => {
  try {
    const { category, type, vehicle_id, capacity, price, driver, operator, contact } = req.body
    const newRental = new rentalModel({
      category, type, vehicle_id, capacity, price, driver, operator, contact
    })
    await newRental.save()
    res.json({ success: true, message: "Rental Added" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: "Error saving rental" })
  }
}

export const getRentals = async (req, res) => {
  try {
    const rentals = await rentalModel.find({})
    res.json(rentals)
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: "Error fetching rentals" })
  }
}
