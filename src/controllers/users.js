const user = require('../models')['users']
const { Op } = require('sequelize')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config");

let Users = {}
// precisa implementar a autentificação ainda


Users.signup = (req, res) => {
  // Save User to Database
  user.create({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(res.send({ message: "User was registered successfully!" }))
    .catch(res.status(404).send({ message: "Error!" }))
}

Users.login = (req, res) => {
  user.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret);

      res.status(200).send({
          name: user.name,
          email: user.email,
          accessToken: token
        });
      });
    }
  

Users.getById =  (req, res) => {
    
  res.status(200).json( {userId: req.userId})

}

Users.getUser = async (req, res) => {
    await user.findOne({
      where: {id: req.userId }
    }).then(result =>{
      res.status(200).json({
        name: result.name,
        email: result.email,
        created: result.createdAt,
        updated: result.updatedAt
      })
    })
}

Users.update = async (req, res, next) => {
  const password = bcrypt.hashSync(req.body.password, 8)
  const result = await user.update({password: password}, {
    where: { id: req.userId }
  })

  res.status(200).json({ message: "Password was updated successfully!" })
}


Users.delete = async (req, res, next) => {
     await user.destroy({
    where: { id: req.userId }
  }).then(res.send({ message: "User was deleted!" }))

}

/*
Users.getById = async (req, res, next) => {
  const {userId} = req.params
  await user.findAll({
    where: {id: userId }
  }).then(result => {
    if(!result.length){
      return res.status(404).send("Nada encontrado")
    }
    res.status(200).json(result)
  })
}
*/

/*
Users.create = async (req, res, next) => {
  const result = await model.create(req.body)
  res.status(201).json("Cadastro realizado!")
}


Users.delete = async (req, res, next) => {
  const { userId } = req.params
  const result = await model.destroy({
    where: { id: userId }
  })

  res.status(204).json({ result })
}


*/


module.exports = Users
