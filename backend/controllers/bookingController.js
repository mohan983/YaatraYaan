import Booking from "../models/bookingModel.js"

export const addBooking = async (req, res) => {
  try {
    const { user, name, mobile_number, vehicle_id, vehicle_type, from, to, passengers, date, amount, status } = req.body
    const newBooking = new Booking({
      user, name, mobile_number, vehicle_id, vehicle_type, from, to, passengers, date, amount, status
    })
    await newBooking.save()
    return res.json({ success: true, message: "Booked Successfully" })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ success: false, message: "Booking Failed" })
  }
}

export const getBookings = async (req, res) => {
  try {
    const userParam = req.query.user
    const bookings = userParam!==undefined ? await Booking.find({ user: userParam }): await Booking.find({  })
    return res.json(bookings)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ success: false, message: "Error fetching bookings" })
  }
}
