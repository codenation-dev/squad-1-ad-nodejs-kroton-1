module.exports = (sequelize, DataTypes) =>
  sequelize.define('users', {
    // ... Implemente as colunas de users
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    token: DataTypes.STRING
  })
