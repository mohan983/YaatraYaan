import express from 'express'
import { addQuery, getQuery } from '../controllers/queryController.js'

const queryRouter = express.Router()

queryRouter.post('/add', addQuery)
queryRouter.get('/', getQuery)

export default queryRouter