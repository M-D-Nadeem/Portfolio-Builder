
import app from "./app.js"
import dotenv from "dotenv"
dotenv.config()
import dbConnect from "./config/dbConnection.js"
dbConnect()

const PORT=process.env.PORT || 8001
app.listen(PORT,()=>{ 
    console.log(`Server is running at http://localhost:${PORT}`);
})