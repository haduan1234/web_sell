import express from 'express'
import userController from '../controller/userController.js'

var route = express.Router();

route.get('/', userController.index)
route.get('/signUp', userController.getSignUp)
route.post('/signUp', userController.createUser)
route.post('/login', userController.singIn)
route.get('/Admin', userController.Admin)
route.get('/loginAdmin', userController.loginAdmin)
route.post('/loginAdmin', userController.postloginAdmin)

export default route