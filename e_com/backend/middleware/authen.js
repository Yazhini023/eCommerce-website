import jwt from "jsonwebtoken";
import { User } from "../model/User.js";


export const isAuth = async(req,res,next) => {
    try {
        const token=req.headers.token;
        if(!token){
            return res.status(403).json({message:"Please login to access"});
        }
        //Decode JWT Iis signed
        const decodedData=jwt.verify(token,process.env.JWT_SECRET);
        req.user=await User.findById(decodedData._id);
        next();
    } catch (error) {
        return res.status(403).json({message:"Please login to access"});
    }
}