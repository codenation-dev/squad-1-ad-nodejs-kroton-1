const express = require('express')
const router = express.Router()
const controller = require('../controllers/users')

router.get('/', controller.getAll)

router.get('/:userId', controller.getById)

router.post('/signup', controller.create)

router.put('/:userId', controller.update)

router.delete('/:userId', controller.delete)

//operacoes de login
router.post('/login', controller.login)

module.exports = router
