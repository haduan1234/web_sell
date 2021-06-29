import db from '../db.js'

const index = (req, res) => {
    if (typeof req.query.id !== "undefined") {
        let id = req.query.id
        let sql = "Select * from product where id =" + id
        db.query(sql, (error, results) => {
            if (error) throw error;
            else {
                if (results.length > 0) {
                    return res.render('product/cart', {
                        cart: results[0],
                    })
                }
            }

        })

    }
}

const cartController = {
    index
}

export default cartController;