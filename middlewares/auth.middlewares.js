import db from '../db.js'
const require = function(req, res, next) {
    console.log("id la :", req.cookies)
    if (typeof req.cookies == 'undefined') {
        return res.render('user')
    } else {
        let cookie = req.cookies.userId
        let sql = "select * from user wherw id = " + cookie
        db.query(sql, (error, results) => {
            if (error) throw error;
            else {
                if (results.length > 0) {
                    next()
                } else {
                    res.render('user')
                }
            }
        })
    }
}

const requireAuth = {
    require
}

export default requireAuth;