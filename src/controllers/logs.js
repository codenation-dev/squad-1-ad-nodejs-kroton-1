const logsModel = require('../models')['logs']
const usersModel = require('../models')['users']

let Logs = {}

Logs.getAll = async (req, res, next) => {
  const data = await logsModel.findAll({})
  res.status(200).json( data )
  // a gente traz em json mesmo né? A galera do front que depois deixa tabular?
}

Logs.getById = async (req, res, next) => {
  const {logId} = req.params
  const data = await logsModel.findOne({
    where: { id: logId }
  })
  res.status(200).json(data)
}

Logs.getLogUsers = async (req, res, next) => {
  // ...
}

Logs.create = async (req, res, next) => {
  // ...
}

Logs.update = async (req, res, next) => {
  const { logId } = req.params
  const result = await logsModel.update(req.body, {
    where: { id: logId }
  })
  
  res.status(200).json({ result })
}

Logs.delete = async (req, res, next) => {
  const { logId } = req.params
  const result = await logsModel.destroy({
    where: { id: logId }
  })

  res.status(204).json({ result })
}

module.exports = Logs
