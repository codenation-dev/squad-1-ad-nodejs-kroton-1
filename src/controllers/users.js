const user = require('../models')['users']
const { Op } = require('sequelize')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config");

let Users = {}

Users.signup = async (req, res, next) => {
  // Save User to Database
  try{
  await user.create({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(result => {
     return res.status(200).json({ message: "User was registered successfully!" })
    })
    } catch(err){
      res.status(404).json({ message: "Error: User was not registered!" })
    }

}

Users.login = async (req, res) => {
  await user.findOne({
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

      res.status(200).json({
          name: user.name,
          email: user.email,
          accessToken: token
        });
      });
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
  }).then(res.status(204).json({ message: "User was deleted!" }))

}


module.exports = Users
