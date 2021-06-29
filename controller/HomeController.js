import db from '../db.js'

const index = (req, res) => {
    let sqlProduct = "Select * from product"
    db.query(sqlProduct, (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render('product/homePage', {
                product: results
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
const phone = (req, res) => {
    let sql = "Select * from product where type = 'phone'"
    db.query(sql, (error, results) => {
        if (error) throw error;
        else {
            res.render('product/productType', {
                product: results
            })
        }
    })

}
const computer = (req, res) => {
    let sql = "Select * from product where type = 'computer'"
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
    phone,
    computer
}

export default Controller;