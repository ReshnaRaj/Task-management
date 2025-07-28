import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import dbConnection from "./config/dbConnection"
import authRoute from "../src/routes/authRoute"
dotenv.config()
const app=express()
const PORT=process.env.PORT

app.use(express.json());
app.use('/api/auth',authRoute);
app.use(cors({
    origin:[process.env.BASE_URL as string],
    methods:['POST','GET','PUT','DELETE'],
    credentials:true
}))
 

dbConnection()