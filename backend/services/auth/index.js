import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";

const app=express();
const port=process.env.PORT || 8000;

app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Hello from auth");
})

app.listen(port, () => {
    console.log(`Auth is running on port ${port}`);
    connectDB();
})