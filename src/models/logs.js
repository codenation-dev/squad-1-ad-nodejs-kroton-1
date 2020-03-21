module.exports = (sequelize, DataTypes) =>
  sequelize.define('logs', {
    level: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING,
    message: DataTypes.STRING,    
    system: {
      type: DataTypes.STRING,
      validate: {
        isLowerCase: true
      }
    }
  })
