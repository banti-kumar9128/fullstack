import express from 'express'
import dotenv from 'dotenv'
import router from './routes/Route.js'
import { connecDB } from "./db/db.js"
import cors from "cors"


const app =express()
dotenv.config()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))
const PORT=process.env.PORT ||4500

app.use("/api",router)


app.listen(PORT,(req,res)=>{
    connecDB()
    console.log(`server is running on http://localhost:${PORT}`)
})

