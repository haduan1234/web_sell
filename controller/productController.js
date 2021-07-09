import { query } from 'express'
import db from '../db.js'

const index = (req, res) => {
    if (typeof req.query.id !== "undefined") {
        let id = req.query.id
        let sql = "Select * from product where id =" + id
        db.query(sql, (error, results) => {
            if (error) throw error;
            else {
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

const show = async(req, res) => {
    var page = parseInt(req.query.page) || 1;
    var perPage = 6;
    var start = (page - 1) * perPage
    var end = page * perPage




    let sql = "SELECT * FROM product"
    db.query(sql, (error, results) => {
        if (error) throw error;
        else {
            var pageLength = Math.floor(results.length / perPage) + 1
            res.render('product/show', {
                product: results.slice(start, end),
                page
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
        } else {
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
            } else {
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
    let sql = "Select * from product where name like " + `'%${name}%'`
    db.query(sql, (error, results) => {
        if (error) throw error;
        else {
            res.render('product/show', {
                product: results
            })

        }
    })

}

const color = (req, res) => {
    let id = req.query.id
    let sql = "SELECT * FROM product_color where id_product =" + id
    db.query(sql, (error, results) => {
        if (error) throw error;
        else {
            if (results.length > 0) {
                if (typeof id !== "undefined") {
                    res.render('product/createColor', {
                        id,
                        product: results
                    })
                }
            } else {
                res.render('product/createColor')
            }
        }
    })

}

const addcolor = (req, res, ) => {
    if (typeof req.body.id_product !== 'undefined') {
        let id = req.body.id_product
        req.body.image_color = req.file.path.split('\\').slice(1).join('\\')
        let insert = req.body
        let sqlid = "Select * from product_color where id_product =" + id
        db.query(sqlid, (error, results) => {
            if (error) throw error;
            else {
                if (results.length > 0) {
                    let sqlid = "Select * from product_color where name_color = ?"
                    db.query(sqlid, req.body.name_color, (error, results) => {
                        if (error) throw error;
                        else {
                            if (results.length > 0) {
                                res.render('product/createColor', {
                                    id,
                                    error: "color đã tồn tại"
                                })
                            } else {
                                let sqlInsert = "INSERT INTO product_color SET ?"
                                db.query(sqlInsert, insert, (error, results) => {
                                    if (error) throw error
                                    else {
                                        let sql = "SELECT * FROM product_color where id_product =" + id
                                        db.query(sql, (error, results) => {
                                            if (error) throw error;
                                            else {
                                                if (results.length > 0) {
                                                    if (typeof id !== "undefined") {
                                                        res.render('product/createColor', {
                                                            id,
                                                            product: results
                                                        })
                                                    }
                                                }
                                            }
                                        })
                                    }
                                })
                            }
                        }

                    })

                } else {
                    let sqlInsert = "INSERT INTO product_color SET ?"
                    db.query(sqlInsert, insert, (error, results) => {
                        if (error) throw error
                        else {
                            res.render('product/createColor', {
                                id
                            })
                        }
                    })
                }
            }
        })
    }
}

const colorShow = (req, res) => {
    let sql = "SELECT * FROM product_color"
    db.query(sql, (error, results) => {
        if (error) throw error;
        else {
            if (results.length > 0) {
                res.render('product/colorShow', {
                    product: results

                })
            }
        }
    })
}
const searchColor = (req, res) => {
    let name = req.query.search
    let sql = "Select * from product_color where name_color like " + `'%${name}%'`
    db.query(sql, (error, results) => {
        if (error) throw error;
        else {
            res.render('product/colorShow', {
                product: results
            })

        }
    })

}
const productGroup = (req, res) => {
    let id = req.query.id
    if (typeof id !== 'undefined') {
        let sqlid = "SELECT * FROM product_group where group_id =" + id
        db.query(sqlid, (error, results) => {
            if (error) throw error;
            else {
                res.render('product/createGroup', {
                    product_group: results[0]
                })
            }
        })
    } else {
        res.render('product/createGroup')
    }

}

const postGroup = (req, res) => {
    req.body.group_avarta = req.file.path.split('\\').slice(1).join('\\')
    let product_group = req.body
    let id = product_group.group_id
    if (typeof id !== 'undefined') {
        let sqlid = "select  * from product_group where group_id =" + id
        db.query(sqlid, (error, results) => {
            if (error) throw error;
            else {
                if (results.length > 0) {
                    let sqlUpdate = "UPDATE product_group SET ? WHERE group_id =" + id
                    db.query(sqlUpdate, product_group, (error, results) => {
                        if (error) throw error;
                        else {
                            let sql = "SELECT * FROM product_group"
                            db.query(sql, (error, results) => {
                                if (error) throw error;
                                else {
                                    res.render('product/showCircle', {
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
        if (typeof product_group.group_name !== 'undefined') {
            let sqlname = "select  * from product_group where group_name =?"
            db.query(sqlname, product_group.group_name, (error, results) => {
                if (error) throw error;
                else {
                    if (results.length > 0) {
                        let sql = "SELECT * FROM product_group"
                        db.query(sql, (error, results) => {
                            if (error) throw error;
                            else {
                                res.render('product/createGroup', {
                                    product: results,
                                    error: "Nhóm đã tồn tại"
                                })
                            }
                        })
                    } else {
                        let sqlInsert = "INSERT INTO product_group SET ?"
                        db.query(sqlInsert, product_group, (error, results) => {
                            if (error) throw error
                            else {
                                let sql = "SELECT * FROM product_group"
                                db.query(sql, (error, results) => {
                                    if (error) throw error;
                                    else {
                                        if (results.length > 0) {
                                            res.render('product/createGroup', {
                                                product: results
                                            })
                                        }
                                    }
                                })
                            }
                        })
                    }
                }
            })
        }

    }
}
const msProduct = (req, res) => {
    res.render('product/producrManagement')

}

const showCircle = (req, res) => {
    let sql = "SELECT * FROM product_group"
    db.query(sql, (error, results) => {
        if (error) throw error;
        else {
            res.render('product/showCircle', {
                product: results
            })
        }
    })
}

const deleteCircle = (req, res) => {
    let id = req.query.id
    let sql = "Select * from product_group where group_id = " + id
    db.query(sql, (error, results) => {
        if (error) {
            throw error;
        } else {
            if (results.length > 0) {
                let sqlDelete = "delete from product_group where group_id = " + id
                db.query(sqlDelete, (error) => {
                    if (error) throw error;
                    else {
                        let sqlProduct = "Select * from product_group"
                        db.query(sqlProduct, (error, results) => {
                            if (error) {
                                throw error;
                            } else {
                                res.render('product/showCircle', {
                                    product: results
                                })
                            }
                        })
                    }
                })
            } else {
                let sql = "SELECT * FROM product_group"
                db.query(sql, (error, results) => {
                    if (error) throw error;
                    else {
                        res.render('product/showCircle', {
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
    search,
    color,
    addcolor,
    colorShow,
    searchColor,
    productGroup,
    postGroup,
    msProduct,
    showCircle,
    deleteCircle
}

export default controllerProduct