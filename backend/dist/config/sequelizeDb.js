"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Sequelize } = require('sequelize');
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('railway', 'root', 'GgrwaHIfSSskSyNaIhnVTxQbaqyLBJbC', {
    host: 'monorail.proxy.rlwy.net',
    port: 31362,
    dialect: 'mysql',
    dialectOptions: {
        connectTimeout: 15000,
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
