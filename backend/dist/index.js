"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const userModel_1 = __importDefault(require("./models/userModel"));
const cors_1 = __importDefault(require("cors"));
const exchangeRateModel_1 = __importDefault(require("./models/exchangeRateModel"));
const walletModel_1 = __importDefault(require("./models/walletModel"));
const sequelize_1 = require("sequelize");
const sequelizeDb_1 = __importDefault(require("./config/sequelizeDb"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.listen(port, () => {
    console.log(`[server]: Server is running at ${port}`);
});
app.get("/getusers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findAll();
    let string2 = '';
    user.forEach((element) => {
        string2 += JSON.stringify(element.toJSON()) + '<br/>';
    });
    res.send('table ' + string2);
}));
app.get("/ping", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('backend is working');
}));
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findOne({ attributes: ['id', 'name'], where: { username: req.body.username, password: req.body.password } });
    if (user === null) {
        console.log('cannot log in');
        res.send('cannot log in');
    }
    else {
        console.log(user.toJSON());
        res.send(user);
    }
}));
app.get("/getrates", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rate = yield exchangeRateModel_1.default.findAll();
    let obj = [];
    rate.forEach((element) => {
        obj.push(element.toJSON());
    });
    // console.log(obj)
    console.log('executed');
    res.send(obj);
}));
app.post("/getwalletsbyuser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const wallet = yield walletModel_1.default.findAll({ where: { user_id: req.body.user_id } });
    let obj = [];
    wallet.forEach((element) => {
        obj.push(element.toJSON());
    });
    console.log('get wallets');
    res.send(obj);
}));
app.get("/getcurrencybyuser/:user_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currency = yield sequelizeDb_1.default.query(`SELECT currency.id, wallet_id, currency, amount, name FROM currency INNER JOIN wallet ON currency.wallet_id = wallet.id WHERE wallet.user_id = ${req.params.user_id}; `, {
        type: sequelize_1.QueryTypes.SELECT,
    });
    console.log('get currencies');
    res.send(currency);
}));
