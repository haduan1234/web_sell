import express from 'express'
import controllerProduct from '../controller/productController.js'

var route = express.Router();

route.get('/create', controllerProduct.index )
route.post('/create', controllerProduct.postCreate)
route.get('/show', controllerProduct.show)
route.get('/delete', controllerProduct.deleteProduct)

export default route;
