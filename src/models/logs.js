module.exports = (sequelize, DataTypes) =>
  sequelize.define('logs', {
    // ... Implemente as colunas de logs
    //testando commit
    level: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING,
    message: DataTypes.STRING,
    //
    events: DataTypes.INTEGER,
    archived: DataTypes.INTEGER
  })
