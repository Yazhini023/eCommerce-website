import express from "express";
import { loginUser, myProfile, registerUser, verifyuser} from "../controller/controller.js";


const router=express.Router();

router.post("/user/register", registerUser);
router.post("/user/verify",verifyuser);
router.post("/user/login",loginUser);
router.get("/user/profile",myProfile);

export default router;