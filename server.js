import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import { router } from "./router/todo.routes";
config()

const app = express()
app.use(express.json())

app.use('/api', router)


const PORT = process.env.PORT || 3002

app.listen(PORT, async() => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("server started at port " + PORT);
    } catch (error) {
        console.error("Failed to start server:", error.message);
    }
});