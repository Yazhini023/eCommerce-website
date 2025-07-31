import { User } from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const registerUser= async(req,res) => {
    try {
        const {name,email,password,contact} =req.body;
        //Code to check that the email has already registered
        let user=await User.findOne({email});
        if(user){
            res.status(400).json({
                message:"User Email Already Exist",
            });
        }
        //Code to convert the password to hashed password
        const hashedPassword=await bcrypt.hash(password,10);
        
        //Code to Generate 6 digit OTP
        const otp=Math.floor(Math.random()*1000000);

        //Create signed activation token
        const activationToken=jwt.sign({user,otp},process.env.ACTIVATION_SECRET,{
            expiresIn:"5m",
        });
    } catch (error) {
        res.status(500).json({
            message:error.message,
        });
    }
};