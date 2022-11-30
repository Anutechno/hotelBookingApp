import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import authRute from "./api/routes/auth.js";
import userRute from "./api/routes/users.js";
import hotelRute from "./api/routes/hotels.js";
import roomRute from "./api/routes/rooms.js";
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express();
dotenv.config({ path: ".env" })

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("Connect to mongodb");
    } catch (error) {
        console.log("not connect");
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongodb disconnected");
})
mongoose.connection.on("connected", () => {
    console.log("mongodb connected");
})

//middleware
app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRute)
app.use("/api/users", userRute)
app.use("/api/hotels", hotelRute)
app.use("/api/rooms", roomRute)

app.use((err, req, res, next) => {
    console.log("hi i am a  middle");
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrogn"
    return res.status(500).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
})


app.listen(8800, () => {
    connect()
    console.log("connected to backend!");
})

//mongodb://localhost:27017/hbooking