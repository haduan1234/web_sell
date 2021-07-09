import db from '../db.js'

const require = function(req, res, next) {

    console.log("id_user :", typeof(req.body.id_user))
    if (typeof req.body.id_user === 'string') {
        return res.render('user/homeAdmin')
    } else {
        let cookie = req.body.id_user
        let sql = "select * from user where id = " + cookie
        db.query(sql, (error, results) => {
            if (error) throw error;
            else {
                if (results.length > 0) {
                    next()
                } else {
                    return res.render('user/Admin')
                }
            }
        })
    }
}

const requireAuth = {
    require
}

export default requireAuth;