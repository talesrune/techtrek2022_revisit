const { DataTypes } = require('sequelize');
import sequelize from "../config/sequelizeDb";
const Currency = sequelize.define(
  'currency',
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncremeent:true
    },
    wallet_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    currency: {
      type: DataTypes.STRING,
      allowNull:false
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull:false
    },
  }, {
    freezeTableName:true,
    timestamps:false
  }
);

export default Currency
// `sequelize.define` also returns the model