const express = require('express')
const router = express.Router()
const controller = require('../controllers/logs')
const { authJwt } = require("../middleware");


router.get('/', authJwt.verifyToken, controller.getAll)

router.get('/level/:level', authJwt.verifyToken, controller.getByLevel)

router.get('/system/:system', authJwt.verifyToken, controller.getBySystem)

router.post('/', authJwt.verifyToken, controller.create)

module.exports = router



  
