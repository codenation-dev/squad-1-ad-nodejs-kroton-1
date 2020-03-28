module.exports = (sequelize, DataTypes) =>
  sequelize.define('users', {  
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },  
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
