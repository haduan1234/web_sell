import db from '../db.js'

const index = (req, res) => {
    if (typeof req.query.id !== "undefined") {
        let id = req.query.id
        let sql = "Select * from product where id =" + id
        db.query(sql, (error, results) => {
            if (error) throw error;
            else {
                console.log("product:", results[0].image)
                if (results.length > 0) {
                    return res.render('product/create', {
                        editProduct: results[0],
                    })
                }
            }

        })
    } else {
        res.render('product/create')
    }

}


const postCreate = (req, res, next) => {
    if (typeof req.body.id !== "undefined") {
        let id = req.body.id
        let sql = "Select * from product where id =" + id
        db.query(sql, (error, results) => {
            if (error) throw error;
            else {
                if (results.length > 0) {
                    req.body.image = req.file.path.split('\\').slice(1).join('\\')
                    let updateProduct = {
                        id: req.body.id,
                        name: req.body.name,
                        price: req.body.price,
                        brand: req.body.brand,
                        image: req.body.image,
                        amount: req.body.amount
                    }
                    let id = req.body.id
                    let sqlUpdate = "UPDATE product SET ? WHERE id=" + id
                    db.query(sqlUpdate, updateProduct, (error, results) => {
                        if (error) throw error;
                        else {
                            let sql = "SELECT * FROM product"
                            db.query(sql, (error, results) => {
                                if (error) throw error;
                                else {
                                    res.render('product/show', {
                                        product: results
                                    })
                                }
                            })
                        }
                    })
                }
            }
        })
    } else {
        req.body.image = req.file.path.split('\\').slice(1).join('\\')
        let product = req.body
        let sql = "Select * from product where name = ?"
        db.query(sql, product.name, (error, results) => {
            if (error) throw error;
            else {
                if (results.length > 0) {
                    res.render('product/create', {
                        error: "sản phẩm đã có"
                    })
                }
                let sqlInsert = "INSERT INTO product SET ?"
                db.query(sqlInsert, product, (error, results) => {
                    if (error) throw error

                    else {
                        res.render('product/create')
                    }
                })
            }
        })
    }
}

const show = (req, res) => {
    let sql = "SELECT * FROM product"
    db.query(sql, (error, results) => {
        if (error) throw error;
        else {
            res.render('product/show', {
                product: results
            })
        }
    })

}

const deleteProduct = (req, res) => {
    let id = req.query.id
    let sql = "Select * from product where id = " + id
    db.query(sql, (error, results) => {
        if (error) {
            throw error;
        }
        else {
            if (results.length > 0) {
                let sqlDelete = "delete from product where id = " + id
                db.query(sqlDelete, (error) => {
                    if (error) throw error;
                    else {
                        let sqlProduct = "Select * from product"
                        db.query(sqlProduct, (error, results) => {
                            if (error) {
                                // cau len truy van sai
                                throw error;
                            } else {
                                res.render('product/show', {
                                    product: results
                                })
                            }
                        })
                    }
                })
            }
            else {
                let sql = "SELECT * FROM product"
                db.query(sql, (error, results) => {
                    if (error) throw error;
                    else {
                        res.render('product/show', {
                            product: results,
                            error: "Id không tồn tại"
                        })
                    }
                })
            }
        }
    })
}

const search = (req, res) => {
 let name = req.query.search
 let sql = "Select * from class where name like "
    var query =  db.query(sql, `%${name}%`, (error, results) => {
        if (error) throw error;
        else {

        } 
    })

}

const controllerProduct = {
    index,
    postCreate,
    show,
    deleteProduct,
    search
}

export default controllerProduct