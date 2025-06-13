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

 //delete product
 export async function deleteProduct(req,res){
    if(!isAdmin(req)){
        return res.json({message:"Access denied (delect). Admins Only."})
    }

    try{
        const prodcutId = req.params.prodcutId

        await product.deleteOne({
            prodcutId : prodcutId
        })

        res.json({message : "prodect deleted successfully"})
    }catch(error){
        console.error("Error delecting product",error)
        res.status(500).json({message: "Feild to delete product"})
    }

 } 

 //update prodcut
 export async function updateProduct(req,res) {
    if(!isAdmin(req)){
        return res.status(403).json({message : "Access deny (update) Admin have only access"})
    }

    //not to change product ID when product update
    const data = req.body
    data.prodcutId = productID

    try{
        await product.updateOne(
            {
                productID : prodcutId //find product
            },
            data
        )
    }catch(error){
         console.error("Error delecting product",error)
        res.status(500).json({message: "Feild to update product"})
        }
 
 }

 //get one product information
 export async function getProdcutInfo(req,res) {
    try{
        //serach prodcut ID
        const prodcutId = req.params.prodcutId
        //serach product
        const prodcut = await prodcut.findOne({prodcutId:prodcutId})

        if(product == null){
            return res.status(404).json({message : "Product is not found"})
        }

        //So admin can access every product
        if(isAdmin(req)) {
            res.json(prodcut)
        }else{
            if(prodcut.isAvailble){
                res.json(prodcut)
            }else{
                res.json({message : "Product isnot availble now"})
            }
        }
    }catch(error){
         console.error("Error delecting product",error)
        res.status(500).json({message: "Feild to get product info"})
    }
 }
