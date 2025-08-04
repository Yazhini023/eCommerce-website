import {Product} from "../model/Product.js";

//Add New Product
export const createProduct=async(req,res) => {
    try {
        //Check User Role
        if(req.user.role!="admin"){
            return res.status(403).json({
                message:"Unauthorized Access",
            });
        }
        
        const {title,description,category,price,stock}=req.body;
        const image=req.file;
        if(!image){
            return res.status(400).json({
                message:"Please Select The Image",
            });
        }

        //Store to db
        const product=await Product.create({
            title,
            description,
            category,
            price,
            stock,
            image:image?.path,
        });
        res.status(201).json({
            message:"Product Details added successfully",
            product,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};