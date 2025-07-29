import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import validateEnv from './utils/env';
import { env } from "./config/env.config";
import dbConnection from "./config/dbConnection"
dbConnection()
validateEnv();
const app=express()
const PORT=env.PORT;
 

app.use(express.json());
// app.use('/api/auth',authR);
app.use(cors({
    origin:[process.env.BASE_URL as string],
    methods:['POST','GET','PUT','DELETE'],
    credentials:true
}))
 
 



app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
});