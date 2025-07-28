import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import dbConnection from "./config/dbConnection"
 
dotenv.config()
const app=express()
const PORT=process.env.PORT

app.use(express.json());
// app.use('/api/auth',authR);
app.use(cors({
    origin:[process.env.BASE_URL as string],
    methods:['POST','GET','PUT','DELETE'],
    credentials:true
}))
 
 

dbConnection()
app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
});