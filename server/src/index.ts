import express from "express"
import {errorHandler} from "../src/middleware/error.handler"
import cors from "cors"
import validateEnv from './utils/env';
import { env } from "./config/env.config";
import dbConnection from "./config/db.connection"
import authRoute from "./routes/auth.router"
import taskRoute from "./routes/task.router"
import cookieParser from "cookie-parser"
dbConnection()
validateEnv();
const app=express()
const PORT=env.PORT;
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin:[env.BASE_URL as string],
    methods:['POST','GET','PUT','DELETE'],
    credentials:true
}))
app.use('/api/auth',authRoute);
app.use('/api/task',taskRoute)
app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
});