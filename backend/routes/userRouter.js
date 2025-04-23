import express from 'express'
import { addUser, getUser } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.post('/add', addUser)
userRouter.get('/', getUser)

export default userRouter
