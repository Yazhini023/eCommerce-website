import express from "express";
import { loginUser, myProfile, registerUser, verifyuser} from "../controller/controller.js";
import { isAuth } from "../middleware/authen.js";


const router=express.Router();

router.post("/user/register", registerUser);
router.post("/user/verify", verifyuser);
router.post("/user/login", loginUser);
router.get("/user/profile", isAuth, myProfile);

export default router;