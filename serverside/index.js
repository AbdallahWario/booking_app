import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser"


const app = express();
dotenv.config()

const connect = async()=>{
    try {

        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to db")
        
    } catch (error) {
        throw error
    }

}

app.use(cookieParser())
app.use(express.json())
app.use("/api/auth",authRoute)
app.use("/api/rooms",roomsRoute)
app.use("/api/users",usersRoute)
app.use("/api/hotels",hotelsRoute)



app.listen(process.env.PORT,()=>{
    connect();
    console.log("connected to server")
})