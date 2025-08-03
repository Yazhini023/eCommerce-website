import { User } from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendMail from "../middleware/sendmail.js";

//New user registration
export const registerUser= async(req,res) => {
    try {
        const {name,email,password,contact} =req.body;


        //Code to check that the email has already registered
        let user=await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:"User Email Already Exist",
            });
        }


        //Code to convert the password to hashed password
        const hashedPassword=await bcrypt.hash(password,10);
        
        //Code to Generate 6 digit OTP
        const otp=Math.floor(Math.random()*1000000);


        //Create new user data

        user={name,email,hashedPassword,contact};


        //Create signed activation token
        const activationToken=jwt.sign({user,otp},process.env.ACTIVATION_SECRET,{
            expiresIn:"5m",
        });


        //Send email to user
        const message = `Please Verify your account using OTP you OTP is ${otp}`;
        await sendMail(email,"Welcome to eCommerce",message);
        return res.status(200).json({
            message:"OTP is send to your email",
            activationToken,
        });
    } catch (error) {
        return res.status(500).json({
            message:error.message,
        });
    }
};


//Verify OTP
export const verifyuser=async(req,res)=>{
    try {
        const {otp,activationToken}=req.body;
        let verify;
        try {
           verify = jwt.verify(activationToken,process.env.ACTIVATION_SECRET); 
        } catch (error) {
            return res.status(400).json({ message: "OTP has expired " });
        }
        if(verify.otp !== parseInt(otp)){
            return res.status(400).json({ message:"Incorrect OTP" });
        }

        await User.create({
            name:verify.user.name,
            email:verify.user.email,
            password:verify.user.hashedPassword,
            contact:verify.user.contact,
        });
        return res.status(200).json({message:"User Registrartion Successful"});
    } catch (error) {
        return res.status(500).json({
            message:error.message,
        });
    }
};

//Login User
export const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body;
        //Check User Email Address

        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"Invalid Credentials",
            });
        }

        //Check password
        const matchpassword=await bcrypt.compare(password,user.password);
        if(!matchpassword){
            return res.status(400).json({
                message:"Invalid Credentials",
            });
        }

        //Generate Signed Token
        const token=jwt.sign({_id:user.id},process.env.JWT_SECRET,{expiresIn:"15d"});
        
        //Exclude the assword field before sending the response
        const {password:userPassword,...userDetails}=user.toObject();
        return res.status(200).json({
            message:"Welcome"+user.name,
            token,
            user:userDetails,
        });

    } catch (error) {
        return res.status(500).json({
            message:error.message,
        });
    }
}

//User Profile
export const myProfile=async(req,res)=>{
    try {
        console.log(req.user);
        const user=await User.findById(req.user._id).select("-password");
        return res.status(200).json({
            user,
        });
    } catch (error) {
        return res.status(500).json({
            message:error.message,
        });
    }
}