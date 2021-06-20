import { render } from "pug"
import db from "../db.js"

const show = (req, res ) =>{
    render('product/Create')
}

const showProduct = {
    show
}

export default showProduct;