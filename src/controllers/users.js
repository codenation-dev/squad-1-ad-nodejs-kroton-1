const model = require('../models')['users']
const { Op } = require('sequelize')
const jwt = require('jsonwebtoken')

let Users = {}

Users.getAll = async (req, res, next) => {
  
}

Users.getById = async (req, res, next) => {
  // ...
}

Users.create = async (req, res, next) => {
  const result = await model.create(req.body)
  res.status(201).json("Cadastro realizado!")
}

Users.login = async (req, res, next) => {
  // ...
}

Users.update = async (req, res, next) => {
  const { userId } = req.params
  const result = await model.update(req.body, {
    where: { id: userId }
  })

  res.status(200).json({ result })
}

Users.delete = async (req, res, next) => {
  const { userId } = req.params
  const result = await model.destroy({
    where: { id: userId }
  })

  res.status(204).json({ result })
}

module.exports = Users
