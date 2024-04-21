"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes } = require('sequelize');
const sequelizeDb_1 = __importDefault(require("../config/sequelizeDb"));
const Currency = sequelizeDb_1.default.define('currency', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncremeent: true
    },
    wallet_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
}, {
    freezeTableName: true,
    timestamps: false
});
exports.default = Currency;
// `sequelize.define` also returns the model
