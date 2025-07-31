import express from "express";
import { registerUser, verifyuser } from "../controller/controller.js";


const router=express.Router();

router.post("/user/register", registerUser);
router.post("/user/verify",verifyuser)

export default router;