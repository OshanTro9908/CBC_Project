import Product from "../models/product.js";

//create prodect create funcation
export async function createprodecut(req,res){
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