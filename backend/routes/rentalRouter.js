import express from "express"
import { addRental, getRentals } from "../controllers/rentalController.js"

const rentalRouter = express.Router()

rentalRouter.post("/add", addRental)
rentalRouter.get("/", getRentals)

export default rentalRouter