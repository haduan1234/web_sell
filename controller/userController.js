import db from '../db.js'

const index = async (req, res) => {
    res.render('user/index')
}

const getSignUp = async (req, res) => {
    res.render('user/signUp')
}


const createUser = (req, res) => {
    let user = req.body;
    let email = req.body.email
    let sql = "Select * from user where email = ?"
    var query = db.query(sql, email, (error, results) => {
        if (error) throw error;
        else {
            if (results.length > 0) {
                res.render('user/signUp', {
                    error: "email đã được đăng ký",
                    user
                })
            }

            let sqlInsert = "INSERT INTO user SET ?"
            db.query(sqlInsert, user, (error, results, fields) => {
                if (error) {
                    res.send("Thông tin không chính xác")
                }
                else {
                    res.render('user/index')
                }
            })

        }

    })
}
const singIn = (req, res) => {
    let email = req.body.name
    let password = req.body.password
    let sql = "Select * from user where email = ?"
     db.query(sql, email, (error, results) => {
        if (error) throw error;
        else {
            if (results.length > 0) {
                let sqlpass = "Select * from user where password = ?"
                db.query(sqlpass, password, (error, results) => {
                    if (error) throw error;
                    else {
                        if(results.length>0){
                            res.redirect('/Home')
                        }else{
                            res.render('user/index',{
                                errorpass: "password không đúng",
                                email
                            })
                        }
                    }
                })
        }else{
            res.render('user/index',{
                erroruser: "Tài khoản không đúng",
                email

            })
        }

        }
    })
}
const controllerUser = {
    index,
    getSignUp,
    createUser,
    singIn
}

export default controllerUser