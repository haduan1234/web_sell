import express from 'express'
import detailController from "../controller/detailProductController.js"

var router = express.Router()

router.get('/', detailController.index)
router.get('/create', detailController.getDetail)
router.post('/create', detailController.createDetial)
router.get('/show', detailController.show)
router.get('/search', detailController.searchDetail)

export default router;