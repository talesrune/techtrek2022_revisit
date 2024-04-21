const { Sequelize } = require('sequelize');
import dotenv from "dotenv";

dotenv.config();

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(process.env.DB, 'root', process.env.PASS, {
    host: process.env.HOST, //roundhouse.proxy.rlwy.net
    port: process.env.DB_PORT, //35513
    dialect: 'mysql',
    dialectOptions:{
        connectTimeout:15000,
        timezone:'+08:00'
    },
    pool:{
        max:5,
        min:0,
        acquire:10000,
        idle:10000
    },
    logging:console.log,
    define:{
        freezeTableName:true,
    }
});

export default sequelize;