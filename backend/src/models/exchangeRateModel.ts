const { Sequelize, DataTypes } = require('sequelize');
import sequelize from "../config/sequelizeDb";
const exchangeRate = sequelize.define(
  'exchange_rate',
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncremeent:true
    },
    base_currency: {
      type: DataTypes.STRING,
      allowNull:false
    },
    exchange_currency: {
      type: DataTypes.STRING,
      allowNull:false
    },
    rate: {
      type: DataTypes.FLOAT,
      allowNull:false
    },
  }, {
    freezeTableName:true,
    timestamps:false
  }
);

export default exchangeRate
// `sequelize.define` also returns the model