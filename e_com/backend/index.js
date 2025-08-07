import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/db.js";

const app = express();
dotenv.config();
const port=process.env.PORT;

//Middle wares
app.use(express.json());
app.use(cors());

//Import Routes
import userRoute from "./route/route.js"
import productRoute from "./route/Productroute.js"

//Static file
app.use("/uploads",express.static("uploads"));

//Using Routes
app.use("/api/",userRoute);
app.use("/api/",productRoute);

app.get("/",(req,res) => {
    res.send("<h1> Hello World </h1>");
});

app.listen(port,() => {
    console.log(`Server Running in port ${port}`);
    connectDB();
});