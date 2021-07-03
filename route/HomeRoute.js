import express from 'express'
import Controller from '../controller/HomeController.js'

var route = express.Router();

route.get('/', Controller.index)
route.get('/search', Controller.search)
route.get('/group', Controller.group)

export default route;