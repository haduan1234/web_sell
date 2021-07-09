import db from '../db.js'

const index = (req, res) => {
    let id = req.query.id
    let sql = "Select * from product where id=" + id
    db.query(sql, (error, results) => {
        if (error) throw error;
        else {
            // let id_product = results[0].id
            // let image= results[0].image
            // let price= results[0].price
            // let name_product= results[0].name

            let product_new = {
                image: results[0].image,
                price: results[0].price,
                name_product: results[0].name

            }
            let sqlInsert = "update  cart SET ? where id_product =" + id
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


const postIndex = (req, res) => {
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
    postIndex,

}

export default cartController;