import express, { Router } from 'express'
import mysql from 'mysql'
import userRoute from './route/userRoute.js'
import HomeRoute from './route/HomeRoute.js'
import productRoute from './route/productRoute.js'
import detailRoute from "./route/detialProductRoute.js"
import cartRoute from './route/cartRoute.js'

// import requireAuth from './middlewares/auth.middlewares.js'


import db from './db.js'

db.connect();



const app = express()
const port = 3000

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/addStudent', (req, res) => {
    let student = {
        id: 1,
        name: 1111,
        age: 20,
        class_name: "CT1C"
    }

    let sql = "INSERT INTO student SET ?"
    var query = db.query(sql, student, (error, results, fields) => {
        if (error) throw error;
        else {
            res.send("add student success")
        }
    })
})

app.get('/addClass', (req, res) => {
    let dataClass = {
        name: "CT1",
        siso: 22,
        teacherName: "Huy",
        studentName: "Duan"
    }

    let sql = "INSERT INTO class SET ?"
    db.query(sql, dataClass, (error) => {
        if (error) throw error;
        else {
            res.send("add class success")
        }
    })
})

app.get('/showClass', (req, res) => {
    let sql = "SELECT * FROM CLASS"
    var query = db.query(sql, (error, results, fields) => {
        if (error) throw error;
        else {
            res.send(results)
        }
    })
})

app.get('/showClassById', (req, res) => {
    let id = req.query.id
    console.log("id : ", id)

    let sql = "Select * from class where id = " + id
    var query = db.query(sql, (error, results) => {
        if (error) {
            // cau len truy van sai
            throw error;
        } else {
            // ket qua
            if (results.length > 0) {
                let updateData = {
                    name: "CT1U11111",
                    siso: 22,
                    teacherName: "Huy1111",
                    studentName: "Duan1111"
                }

                let sqlUpdate = "UPDATE class SET ?"
                db.query(sqlUpdate, updateData, (error) => {
                    if (error) throw error;
                    else {
                        res.send("update class success")
                    }
                })

            } else {
                res.send("no class found")
            }
        }
    })
})

app.get('/removeClass', (req, res) => {
    let id = req.query.id

    let sql = "Select * from class where id = " + id
    var query = db.query(sql, (error, results) => {
        if (error) {
            // cau len truy van sai
            res.send("no class found")
        } else {
            // ket qua
            if (results.length > 0) {
                let sqlDelete = "delete from class where id = " + id
                db.query(sqlDelete, (error) => {
                    if (error) throw error;
                    else {
                        res.send("update class success")
                    }
                })

            } else {
                res.send("no class found")
            }
        }
    })
})

app.use('/user', userRoute)
app.use('/home', HomeRoute)
app.use('/product', productRoute)
app.use('/detail', detailRoute)
app.use('/cart', cartRoute)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})