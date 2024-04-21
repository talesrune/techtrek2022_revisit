const { Sequelize, DataTypes } = require('sequelize');
import sequelize from "../config/sequelizeDb";
const Wallet = sequelize.define(
  'wallet',
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncremeent:true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    name: {
      type: DataTypes.STRING,
      allowNull:false
    }
  }, {
    freezeTableName:true,
    timestamps:false
  }
);

export default Wallet
// `sequelize.define` also returns the model