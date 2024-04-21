"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Sequelize, DataTypes } = require('sequelize');
const sequelizeDb_1 = __importDefault(require("../config/sequelizeDb"));
const ExchangeRate = sequelizeDb_1.default.define('exchange_rate', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncremeent: true
    },
    base_currency: {
        type: DataTypes.STRING,
        allowNull: false
    },
    exchange_currency: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rate: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
}, {
    freezeTableName: true,
    timestamps: false
});
exports.default = ExchangeRate;
// `sequelize.define` also returns the model
