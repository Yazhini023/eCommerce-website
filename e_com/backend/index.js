import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.js";

const app = express();
dotenv.config();
const port=process.env.PORT;

//Middle wares
app.use(express.json());

//Import Routes
import userRoute from "./route/route.js"
//Using Routes
app.use("/api/",userRoute);


app.get("/",(req,res) => {
    res.send("<h1> Hello World </h1>");
});

app.listen(port,() => {
    console.log(`Server Running in port ${port}`);
    connectDB();
});