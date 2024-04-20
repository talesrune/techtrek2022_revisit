import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import User from "./models/userModel";
import cors from 'cors'

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
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