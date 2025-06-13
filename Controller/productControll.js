import e, { response } from "express";
import Product from "../models/product.js";
import { isAdmin } from "./userControll.js";

//create prodect create funcation
export async function createprodecut(req,res){
    
    //check the login
    if(!isAdmin(req)){ //! -not admin
        return res.status(403).json({message : "Access denied. Admins Only."})
    }

    const product = new Product(req.body)
    
    try{
        const response = await product.save()
        res.json({
            message : "product createsd successfully",
            product : response // save response veraible as a prodect
        })
    }catch(error){
        console.error("Error creating product", error)
        return res.status(500).json(
            {message : "Faild to create prodect"}
        )


    }
} 

export async function getProducts(req,res){
 
    try{
        if(isAdmin(req)){
            const products = await Product.find()
            return res.json(products)
        }else{
            const products = await Product.find({isAvailble: true})
            return res.json(products)
        }
    }catch(error){
        console.error("Error featching products",error)
        return res.status(500).json({message : "Failed to featch products"})


    }
    
 }
