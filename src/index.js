import express from 'express'
import dotenv from 'dotenv'
import connectionDB from './config/db.js';
import authRoute from './routes/auth.routes.js'
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();


const port = process.env.PORT;
const url = process.env.DATABASE_URL;

connectionDB(url);

app.use(express.json())

app.use(cookieParser())

app.use("/api/auth",authRoute)

app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.listen(port, ()=>{
    console.log(`App listening to port ${port}`);
})


