const express = require('express')
const router = express.Router()
const users = require('./users')
const logs = require('./logs')

router.get('/', (req, res) => {
  res.json({
    users: 'http://localhost:8080/users',
    logs: 'http://localhost:8080/logs'
  })
})

router.use('/users', users)
router.use('/logs', logs)

module.exports = router
