"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
const { Sequelize } = require('sequelize');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize((_a = process.env.DB) !== null && _a !== void 0 ? _a : 'railway', 'root', (_b = process.env.PASS) !== null && _b !== void 0 ? _b : 'randompass', {
    host: (_c = process.env.HOST) !== null && _c !== void 0 ? _c : 'roundhouse.proxy.rlwy.net',
    port: (_d = process.env.DB_PORT) !== null && _d !== void 0 ? _d : 31362,
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
