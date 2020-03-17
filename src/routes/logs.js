const express = require('express')
const router = express.Router()
const controller = require('../controllers/logs')

router.get('/', controller.getAll)

router.get('/:logId', controller.getById)

router.post('/', controller.create)

module.exports = router
