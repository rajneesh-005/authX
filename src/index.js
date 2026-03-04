import dotenv from 'dotenv'
dotenv.config();

import express from 'express'
import connectionDB from './config/db.js';
import authRoute from './routes/auth.routes.js'
import taskRoute from './routes/task.routes.js'
import cookieParser from 'cookie-parser';

const app = express();

const port = process.env.PORT;
const url = process.env.DATABASE_URL;

connectionDB(url);

app.use(express.json())

app.use(cookieParser())

app.use("/api/auth",authRoute)

app.use('/api/task',taskRoute)

app.get("/",(req,res)=>{
    res.send("Started");
})

app.listen(port, ()=>{
    console.log(`App listening to port ${port}`);
})


