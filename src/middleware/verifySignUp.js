const ulogs = require('../models')['logs']
const User = require('../models')['users']

checkDuplicateUsernameOrEmail = async (req, res, next) => {

     await User.findOne({
        where: {
          email: req.body.email
        }
      }).then(user => {
        if (user) {
          res.status(400).send({
            message: "Failed! Email is already in use!"
          });
          return;
        }
  
        next();
      });
    }

  const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail
  };
  
  module.exports = verifySignUp;