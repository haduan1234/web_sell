import express from 'express'
import userController from '../controller/userController.js'

var route = express.Router();

route.get('/', userController.index)
route.get('/signUp', userController.getSignUp)
route.post('/signUp', userController.createUser)
route.post('/login',userController.singIn)

export default route