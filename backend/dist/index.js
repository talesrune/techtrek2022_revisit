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
    console.log(`[server]: Server is running at http://localhost:${port}`);
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
