import express from 'express'
import cartController from '../controller/cartController.js'

var route =  express.Router();

route.get('/', cartController.index)

export default route;