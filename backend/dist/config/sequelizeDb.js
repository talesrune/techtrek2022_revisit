"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Sequelize } = require('sequelize');
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('multicurrency', 'root', 'root', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
        connectTimeout: 10000,
        timezone: '+08:00'
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 10000,
        idle: 10000
    },
    logging: console.log,
    define: {
        freezeTableName: true,
    }
});
exports.default = sequelize;
