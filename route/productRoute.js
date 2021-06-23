import express from 'express'
import controllerProduct from '../controller/productController.js'
import multer from 'multer'


var upload = multer({ dest: './public/uploads' })
var route = express.Router();

route.get('/create', controllerProduct.index )
route.post('/create',upload.single('image'), controllerProduct.postCreate)
route.get('/show', controllerProduct.show)
route.get('/delete', controllerProduct.deleteProduct)
route.get('/search', controllerProduct.search)

export default route;
