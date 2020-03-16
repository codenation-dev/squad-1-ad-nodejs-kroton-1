const logsModel = require('../models')['logs']
const usersModel = require('../models')['users']

let Logs = {}

Logs.getAll = async (req, res, next) => {
  const data = await logsModel.findAll({})
  res.status(200).json( data )

}

Logs.getById = async (req, res, next) => {
  //parametros passados por exemplo como: {"level": "Error"}
  const {logId} = req.params
  await logsModel.findAll({
    where:  JSON.parse(logId) 
  }).then(result => {
    if(!result.length){
      return res.status(404).send("Nada encontrado")
    }
    res.status(200).json(result)
  })
}


Logs.create = async (req, res, next) => {
  const result = await logsModel.create(req.body)
  res.status(201).json(result)
}

module.exports = Logs
