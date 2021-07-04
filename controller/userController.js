import db from '../db.js'

const index = async(req, res) => {
    res.render('user/index')
}

const getSignUp = async(req, res) => {
    res.render('user/signUp')
}


const createUser = (req, res) => {
    let user = req.body;
    let email = req.body.email
    let sql = "Select * from user where email = ?"
    db.query(sql, email, (error, results) => {
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
                } else {
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
                        if (results.length > 0) {
                            res.cookie('userId', results[0].id)
                            res.redirect('/Home')
                        } else {
                            res.render('user/index', {
                                errorpass: "password không đúng",
                                email
                            })
                        }
                    }
                })
            } else {
                res.render('user/index', {
                    erroruser: "Tài khoản không đúng",
                    email

                })
            }

        }
    })
}

const Admin = (req, res) => {
    res.render('user/homeAdmin')
}

const loginAdmin = (req, res) => {
    res.render('user/loginAdmin')
}
const postloginAdmin = (req, res) => {
    if (typeof req.body.name !== 'undefined') {
        let name = req.body.name
        let sql = "select * from admin_user where Admin_user_name =?"
        db.query(sql, name, (error, results) => {
            if (error) throw error;
            else {
                if (results.length > 0) {
                    let password = req.body.password
                    let sqlpass = "select * from admin_user where pass_word =?"
                    db.query(sqlpass, password, (error, results) => {
                        if (error) throw error;
                        else {
                            if (results.length > 0) {
                                res.render('product/show', {
                                    admin_user: results
                                })
                            } else {
                                res.render('user/loginAdmin', {
                                    error_pass: "password khong dung",
                                    user_name: name
                                })
                            }
                        }
                    })
                } else {
                    res.render('user/loginAdmin', {
                        error_user: "user_name khong dung",
                        user_name: name
                    })
                }
            }
        })
    }
}
const controllerUser = {
    index,
    getSignUp,
    createUser,
    singIn,
    loginAdmin,
    Admin,
    postloginAdmin

}

export default controllerUser