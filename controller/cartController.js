import db from '../db.js'

const index = (req, res) => {
    if (typeof req.query.id !== "undefined") {
        let id = req.query.id
        let sql = "Select * from product where id =" + id
        db.query(sql, (error, results) => {
            if (error) throw error;
            else {
                let product_new = {
                    id_product: results[0].id,
                    image: results[0].image,
                    price: results[0].price,
                    name_product: results[0].name

                }
                let sqlInsert = "INSERT INTO cart SET ?"
                db.query(sqlInsert, product_new, (error, results) => {
                    if (error) throw error
                    else {

                        let sql = "SELECT * FROM cart "
                        db.query(sql, (error, results) => {
                            if (error) throw error;
                            else {
                                console.log("cart:", results)
                                return res.render('product/cart', {
                                    cart: results
                                })

                            }
                        })
                    }
                })
            }


        })

    }
}


const postIndex = (req, res) => {
    console.log()
    let id = req.body.id_product
    let count = req.body.count
    let sql = " select * from cart where id_product = " + id
    db.query(sql, (error, results) => {
        if (error) throw error;
        else {
            if (results.length > 0) {
                let countNew = Number(results[0].count) + Number(count)
                let updateSql = "update cart set count= ? where id_product= " + id
                db.query(updateSql, countNew, (error, results) => {
                    if (error) throw error;
                    else {}
                })
            } else {
                let cart = {
                    id_product: id,
                    count: count
                }
                let sqlInsert = "INSERT INTO cart SET ?"
                db.query(sqlInsert, cart, (error, results) => {
                    if (error) throw error
                    else {
                        res.render("product/cart")
                    }
                })
            }
        }
    })

}

const cartController = {
    index,
    postIndex
    // show
}

export default cartController;