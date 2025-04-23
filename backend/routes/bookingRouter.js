import express from 'express'
import { addBooking, getBookings } from '../controllers/bookingController.js'

const bookingRouter = express.Router()

bookingRouter.post('/add', addBooking)
bookingRouter.get('/', getBookings)

export default bookingRouter
