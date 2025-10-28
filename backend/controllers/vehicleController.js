import vehicleModel from "../models/vehicleModel.js"

export const addVehicle = async (req, res) => {
  try {
    const { category, type, vehicle_id, capacity, price, driver, operator, contact } = req.body
    const newVehicle = new vehicleModel({
      category, type, vehicle_id, capacity, price, driver, operator, contact
    })
    await newVehicle.save()
    res.json({ success: true, message: "Vehicle Added" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: "Error saving vehicle" })
  }
}

export const getVehicles = async (req, res) => {
  try {
    const vehicles = await vehicleModel.find({})
    res.json(vehicles)
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: "Error fetching vehicles" })
  }
}
