import exprees from "express"
import showProduct from "../controller/ShowProductController.js"

var router = exprees.Router();

router.get('/show', showProduct.show)

export default router;