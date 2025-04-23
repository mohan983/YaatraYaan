import User from "../models/userModel.js"

export const addUser = async (req, res) => {
  try {
    const { name, mobile_number, email, gender, username, password, address } = req.body
    // Check if user exists by Username
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Failure: User exists" })
    }
    const newUser = new User({ name, mobile_number, email, gender, username, password, address })
    await newUser.save()
    return res.json({ success: true, message: "Registered Successfully" })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ success: false, message: "Registration Failed" })
  }
}

export const getUser = async (req, res) => {
  try {
    const userParam = req.query.user
    const userData = await User.findOne({ username: userParam })
    return res.json(userData)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ success: false, message: "Error fetching user" })
  }
}
