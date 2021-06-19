import express from 'express'
import Controller from '../controller/HomeController.js'

var route = express.Router();

route.get('/', Controller.index )

export default route;
