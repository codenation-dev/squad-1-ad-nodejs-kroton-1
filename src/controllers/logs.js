const logsModel = require('../models')['logs']
const usersModel = require('../models')['users']

let Logs = {}

Logs.getAll = async (req, res, next) => {
  // ...
}

Logs.getById = async (req, res, next) => {
  // ...
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
