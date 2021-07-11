import express from 'express'
import bodyParser from 'body-parser'

import cookieParser from 'cookie-parser'



import mysql from 'mysql'
import userRoute from './route/userRoute.js'
import HomeRoute from './route/HomeRoute.js'
import productRoute from './route/productRoute.js'
import detailRoute from "./route/detialProductRoute.js"
import cartRoute from './route/cartRoute.js'

import authMiddleweres from './middlewares/auth.middlewares.js'



import db from './db.js'

db.connect();



const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }));


app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.use(express.static('public'))
app.use(cookieParser())


app.use('/user', userRoute)
app.use('/home', authMiddleweres.require, HomeRoute)
app.use('/product', authMiddleweres.authAdmin, productRoute)
app.use('/detail', authMiddleweres.require, detailRoute)
app.use('/cart', authMiddleweres.require, cartRoute)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})