import express from 'express'
import cartController from '../controller/cartController.js'
var route = express.Router();



route.get('/', cartController.index)
route.post('/add', cartController.postIndex)
    // route.get('/show', cartController.show)

export default route;