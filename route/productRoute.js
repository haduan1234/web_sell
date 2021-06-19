import express from 'express'
import Controller from '../controller/productController.js'

var route = express.Router();

route.get('/create', Controller.index )

export default route;
