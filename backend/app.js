import cookieParser from "cookie-parser"
import express, { urlencoded } from "express"
import cors from "cors"
import ProfileRouter from "./routers/profileRouter.js"
import router from "./routers/userRouter.js"
import helperRouter from "./routers/helperRouter.js"
const app=express()
app.use(express.json({ limit: "500mb" }));  // Default is 1MB, increase if needed
app.use(express.urlencoded({ limit: "500mb", extended: true }));  

app.use(cookieParser()) 
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))
 
app.use("/ping",(req,res)=>{
    res.send("PONG")
}) 
 
app.use("/profile",ProfileRouter)
app.use("/user",router)
app.use('/api/helper', helperRouter);

app.all("*",(req,res)=>{ 
    res.status(404).send("OPPS!! 404 page not found")
}) 
export default app;