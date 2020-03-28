const express = require('express')
const router = express.Router()
const { verifySignUp } = require("../middleware");
const { authJwt } = require("../middleware");
const controller = require('../controllers/users')


router.post('/signup', verifySignUp.checkDuplicateUsernameOrEmail , controller.signup)

router.post('/login', controller.login)

router.get('/', authJwt.verifyToken , controller.getUser)

router.put('/update', authJwt.verifyToken, controller.update)

router.delete('/delete', authJwt.verifyToken , controller.delete)


module.exports = router
