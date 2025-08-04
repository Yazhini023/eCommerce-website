import express from"express";
import { isAuth } from "../middleware/authen.js";
import { uploadFiles } from "../middleware/productmid.js";
import { createProduct } from "../controller/Productcont.js";

const router = express.Router();

router.post("/product/new",isAuth, uploadFiles, createProduct);

export default router;