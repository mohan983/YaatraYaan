import express from "express"
import { addVehicle, getVehicles } from "../controllers/vehicleController.js"

const vehicleRouter = express.Router()

vehicleRouter.post("/add", addVehicle)
vehicleRouter.get("/", getVehicles)

export default vehicleRouter
