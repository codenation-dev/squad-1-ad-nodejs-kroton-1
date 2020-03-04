const express = require('express')
const router = express.Router()
const controller = require('../controllers/logs')

router.get('/', controller.getAll)

router.get('/:logId', controller.getById)

router.get('/:logId/users', controller.getLogUsers)

router.post('/', controller.create)

router.put('/:logId', controller.update)

router.delete('/:logId', controller.delete)

module.exports = router
