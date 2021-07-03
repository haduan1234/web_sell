import db from '../db.js'

const index = (req, res) => {
    let sqlProduct = "Select * from product"
    db.query(sqlProduct, (error, results) => {
        if (error) {
            throw error;
        } else {
            let product = results
            let sql = "Select * from product_group "
            db.query(sql, (error, results) => {
                if (error) throw error;
                else {
                    res.render('product/homePage', {
                        product,
                        product_group: results
                    })
                }
            })
        }

    })
}
const search = (req, res) => {
    let name = req.query.search
    let sql = "Select * from product where name like " + `'%${name}%'`
    db.query(sql, (error, results) => {
        if (error) throw error;
        else {
            res.render('product/homePage', {
                product: results,
                name
            })

        }
    })
}

const group = (req, res) => {
    let id = req.query.id
    let sql = "Select * from product where group_id = " + id
    db.query(sql, (error, results) => {
        if (error) throw error;
        else {
            res.render('product/productType', {
                product: results
            })
        }
    })

}

const Controller = {
    index,
    search,
    group
}

export default Controller;