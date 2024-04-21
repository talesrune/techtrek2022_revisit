import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import User from "./models/userModel";
import cors from 'cors'
import ExchangeRate from "./models/exchangeRateModel";
import Wallet from "./models/walletModel";
import Currency from "./models/currencyModel";
import { QueryTypes } from "sequelize";
import sequelize from "./config/sequelizeDb";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

console.log(process.env.DB)
console.log(process.env.PASS)
console.log(process.env.HOST)
console.log(process.env.DB_PORT)

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at ${port}`);
});

app.get("/getusers", async (req: Request, res: Response) => {
  const user = await User.findAll()
  let string2 = ''
  user.forEach((element:any) => {
    string2 += JSON.stringify(element.toJSON()) + '<br/>'
  });
  res.send('table ' + string2)
})

app.get("/ping", async (req: Request, res: Response) => {
  res.send('backend is working')
})

app.post("/login", async (req: Request, res: Response) => {
  const user = await User.findOne( {attributes: ['id', 'name'], where: { username: req.body.username, password: req.body.password} })
  if (user === null) {
    console.log('cannot log in')
    res.send('cannot log in')
  } else{
    console.log(user.toJSON())
    res.send(user)
  }
})

app.get("/getrates", async (req: Request, res: Response) => {
  const rate = await ExchangeRate.findAll()
  let obj:any = []
  rate.forEach((element:any) => {
    obj.push(element.toJSON())
  });
  // console.log(obj)
  console.log('executed')
  res.send(obj)
})

app.post("/getwalletsbyuser", async (req: Request, res: Response) => {
  const wallet = await Wallet.findAll( {where: { user_id: req.body.user_id} })
  let obj:any = []
  wallet.forEach((element:any) => {
    obj.push(element.toJSON())
  });
  console.log('get wallets')
  res.send(obj)
})

app.get("/getcurrencybyuser/:user_id", async (req: Request, res: Response) => {
  const currency = await sequelize.query(`SELECT currency.id, wallet_id, currency, amount, name FROM currency INNER JOIN wallet ON currency.wallet_id = wallet.id WHERE wallet.user_id = ${req.params.user_id}; `, {
    type: QueryTypes.SELECT,
  });
  console.log('get currencies')
  res.send(currency)
})