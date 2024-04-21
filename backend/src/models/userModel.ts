const { Sequelize, DataTypes } = require('sequelize');
import sequelize from "../config/sequelizeDb";
const User = sequelize.define(
  'user',
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncremeent:true
    },
    username: {
      type: DataTypes.STRING,
      allowNull:false
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false
      },
      name: {
        type: DataTypes.STRING,
        allowNull:false
      },
  }, {
    freezeTableName:true,
    timestamps:false
  }
);

export default User
// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true