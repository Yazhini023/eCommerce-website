import { Product } from "../model/Product.js";
import { rm } from "fs";

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

//Fetches all product
export const fetchAllProducts=async(req,res)=>{
    try {
        const product=await Product.find();
        return res.status(200).json({
            message:"List of Products",
            product
        });
    } catch (error) {
        return res.status(500).json({
            message:error.message,
        });
    }
};

//Fetch single Product
export const fetchSinglelProduct=async(req,res)=>{
    try {
        const id=req.params.id;
        const product=await Product.findById(id);
        return res.status(200).json({
            message:"Product details",
            product
        });
    } catch (error) {
        return res.status(500).json({
            message:error.message,
        });
    }
};

//Delete Product
export const deleteProduct=async(req,res)=>{
   try {
    //Check User Role
    if(req.user.role!="admin"){
        return res.status(403).json({
            message:"Unauthorized Access",
        });
    }

    const product=await Product.findById(req.params.id);
    if(!product){
        return res.status(403).json({
            message:"Invalid Product Details",
        });
    }

    rm(product.image,() => {
        console.log("Image Deleted");
    });

    await Product.deleteOne();
    return res.json({message:"Product Details Deleted Successfully",});
   } catch (error) {
    return res.status(500).json({
        message:error.message,
    });
   }
};