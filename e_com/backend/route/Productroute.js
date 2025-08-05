import express from"express";
import { isAuth } from "../middleware/authen.js";
import { uploadFiles } from "../middleware/productmid.js";
import { createProduct, deleteProduct, fetchAllProducts, fetchSinglelProduct } from "../controller/Productcont.js";

const router = express.Router();

router.post("/product/new",isAuth, uploadFiles, createProduct);
router.get("/product/all-products",fetchAllProducts);
router.get("/product/single/:id",fetchSinglelProduct);
router.delete("/product/:id",isAuth, deleteProduct);

export default router;