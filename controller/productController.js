import db from '../db.js'

const index = (req, res) => {
    if (typeof req.query.id !== "undefined"){
        let id = req.query.id
        console.log("id :" ,id)
        let sql = "Select * from product where id =" + id
        db.query(sql, (error, results) => {
            if (error) throw error;
            else {
                console.log("product:", results[0].image)
                if (results.length > 0) {
                  return  res.render('product/Create', {
                        editProduct: results[0]
                        
                    })
                }
            }
          
        })
    }else{
         res.render('product/Create')
    }
   
}


const postCreate = (req, res, next) => {
    req.body.image = req.file.path.split('\\').slice(1).join('\\')
    let product = req.body
    let sql = "Select * from product where name = ?"
    db.query(sql, product.name, (error, results) => {
        if (error) throw error;
        else {
            if (results.length > 0) {
                res.render('product/Create', {
                    error: "sản phẩm đã có"
                })
            }
            let sqlInsert = "INSERT INTO product SET ?"
            db.query(sqlInsert, product, (error, results) => {
                if (error) throw error

                else {
                    res.render('product/Create')
                }
            })
        }
    })

    let id = req.query.id
    console.log("id :", id)
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

const controllerProduct = {
    index,
    postCreate,
    show,
    deleteProduct,
}

export default controllerProduct