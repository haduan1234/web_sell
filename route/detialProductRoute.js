import express, { Router } from 'express'
import detailController from "../controller/detailProductController.js"

var router =  express.Router()

router.get('/', detailController.index)

export default router;
