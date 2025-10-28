import { TravelBooking, RentalBooking } from "../models/bookingModel.js"

export const addBooking = async (req, res) => {
  try {
    const {
      user,
      name,
      mobile_number,
      vehicle_id,
      vehicle_type,
      from,
      to,
      passengers,
      date,
      amount,
      status,
      rented_date,
      no_of_days
    } = req.body

    const rentalCategories = ["Bikes", "Cars", "Trekking Items"]
    const isRental = rentalCategories.includes(vehicle_type)
    const Model = isRental ? RentalBooking : TravelBooking

    const newBooking = isRental
      ? new Model({
          user,
          name,
          mobile_number,
          vehicle_id,
          vehicle_type,
          rented_date,
          no_of_days,
          amount,
          status,
        })
      : new Model({
          user,
          name,
          mobile_number,
          vehicle_id,
          vehicle_type,
          from,
          to,
          passengers,
          date,
          amount,
          status,
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
    const { user, type } = req.query // type = 'rental' or 'travel'

    let Model
    if (type === "rental") Model = RentalBooking
    else if (type === "travel") Model = TravelBooking
    else return res.status(400).json({ success: false, message: "Specify booking type" })

    const bookings = user ? await Model.find({ user }) : await Model.find({})
    return res.json(bookings)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ success: false, message: "Error fetching bookings" })
  }
}
