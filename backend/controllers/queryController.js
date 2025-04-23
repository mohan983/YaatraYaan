import queryModel from "../models/queryModel.js"

// Add query
export const addQuery = async (req, res) => {
  try {
    const { name, mobile_number, query } = req.body
    const newQuery = new queryModel({
        name, mobile_number, query
    })
    await newQuery.save()
    res.json({ success: true, message: "Query Added" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: "Error saving query" })
  }
}

// Get all query
export const getQuery = async (req, res) => {
  try {
    const queries = await queryModel.find({})
    res.json(queries)
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: "Error fetching queries" })
  }
}
