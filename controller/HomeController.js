import  db from '../db.js'

const index = (req, res) =>{
    res.render('product/HomePage')
}

const Controller = {
    index
}

export default Controller;