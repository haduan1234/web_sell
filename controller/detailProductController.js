import db from '../db.js'

const index = (req, res) => {
    console.log("test")
    if (typeof req.query.id !== "undefined") {
        let id = req.query.id
        let sql = "Select * from product where id =" + id
        db.query(sql, (error, results) => {
            if (error) throw error;
            else {
                if (results.length > 0) {
                    let product = results[0]
                    let sqlid = "Select * from product_detail where id_product=?"
                    db.query(sqlid, id, (error, results) => {
                        if (error) throw error;
                        else {
                            if (results.length > 0) {
                                res.render('product/detail', {
                                    product: product,
                                    detailProduct: results
                                })
                            }
                            res.render('product/detail', {
                                product: product,
                                detailProduct: []
                            })
                        }
                    })
                }

            }

        })

    }
}

const getDetail = (req, res) => {
    let id = req.query.id
    if (typeof id !== "undefined") {
        res.render('product/createDetail', {
            id
        })
    }
    res.render('product/createDetail')
}



const createDetial = (req, res) => {
    if (typeof req.body.id_product !== "undefined") {
        let detail = req.body
        let name = detail.name_detail
        let sqlid = "Select * from product_detail where id_product=?"
        db.query(sqlid, detail.id_product, (error, results) => {
            if (error) throw error;
            else {
                if (results.length > 0) {
                    let sql = "Select * from product_detail where name_detail like " + `'%${name}%'`
                    db.query(sql, (error, results) => {
                        if (error) throw error;
                        else {
                            if (results.length > 0) {
                                res.render('product/createDetail', {
                                    id: req.body.id_product,
                                    error: "key đã tồn tại"
                                })
                            } else {
                                let sqlUpdate = "INSERT INTO product_detail SET ?"
                                db.query(sqlUpdate, detail, (error) => {
                                    if (error) throw error;
                                    else {
                                        res.render('product/createDetail', {
                                            id: req.body.id_product
                                        })
                                    }
                                })
                            }

                        }
                    })
                } else {
                    let sqlUpdate = "INSERT INTO product_detail SET ?"
                    db.query(sqlUpdate, detail, (error) => {
                        if (error) throw error;
                        else {
                            res.render('product/createDetail', {
                                id: req.body.id_product
                            })
                        }
                    })
                }
            }
        })

    }

}

const show = (req, res) => {

    let sql = "SELECT * FROM product_detail"
    db.query(sql, (error, results) => {
        if (error) throw error;
        else {
            if (results.length > 0) {
                res.render('product/detailShow', {
                    product: results
                })
            }
        }
    })
}
const searchDetail = (req, res) => {
    let name = req.query.search
    let sql = "Select * from product_detail where name_detail like " + `'%${name}%'`
    db.query(sql, (error, results) => {
        if (error) throw error;
        else {
            res.render('product/detailShow', {
                product: results
            })

        }
    })
}

const detailController = {
    index,
    createDetial,
    getDetail,
    show,
    searchDetail
}

export default detailController;