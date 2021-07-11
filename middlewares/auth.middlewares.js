import db from '../db.js'

const require = function(req, res, next) {
    if (!req.cookies.userId) {
        res.render('user/index')
        return;
    } else {
        let id = req.cookies.userId
        let sqlpass = "Select * from user where id = " + id
        db.query(sqlpass, (error, results) => {
            if (error) throw error;
            else {
                if (results.length > 0) {
                    next();
                } else {
                    res.render('user/index')
                    return;
                }


            }
        })
    }

}

const authAdmin = function(req, res, next) {
    if (!req.cookies.userId) {
        res.render('user/index')
        return;
    } else {
        let id = req.cookies.userId
        let sqlpass = "Select * from user where id = " + id
        db.query(sqlpass, (error, results) => {
            if (error) throw error;
            else {
                if (results.length > 0) {
                    if (results[0].permission == 1) {
                        next();
                    } else {
                        res.render('user/index')
                        return;
                    }

                } else {
                    res.render('user/index')
                    return;
                }


            }
        })
    }

}

const requireAuth = {
    require,
    authAdmin

}

export default requireAuth;