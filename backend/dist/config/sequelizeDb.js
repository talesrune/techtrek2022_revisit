"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Sequelize } = require('sequelize');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(process.env.DB, 'root', process.env.PASS, {
    host: process.env.HOST, //roundhouse.proxy.rlwy.net
    port: process.env.DB_PORT, //35513
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
