import express from 'express'
import controllerProduct from '../controller/productController.js'
import multer from 'multer'


var upload = multer({ dest: './public/uploads' })
var route = express.Router();

route.get('/create', controllerProduct.index)
route.post('/create', upload.single('image'), controllerProduct.postCreate)
route.get('/show', controllerProduct.show)
route.get('/delete', controllerProduct.deleteProduct)
route.get('/search', controllerProduct.search)
route.get('/color', controllerProduct.color)
route.post('/color', upload.single('image_color'), controllerProduct.addcolor)
route.get('/colorShow', controllerProduct.colorShow)
route.get('/searchColor', controllerProduct.searchColor)
route.get('/group', controllerProduct.productGroup)
route.post('/group', upload.single('group_avarta'), controllerProduct.postGroup)
export default route;