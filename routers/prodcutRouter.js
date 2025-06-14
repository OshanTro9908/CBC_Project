import express from "express";
import { createprodecut, deleteProduct, getProdcutInfo, getProducts, updateProduct } from "../Controller/productControll.js";

const prodcutRouter = express.Router()

prodcutRouter.post("/", createprodecut)
prodcutRouter.get("/",getProducts)

//delect request
prodcutRouter.delete("/api/:productId",deleteProduct)
//we don't want to use jeson file when we uses this functions, localhost/5000/:productID 
//pls use like this featuers only above

prodcutRouter.put("/api/:productID",updateProduct)
prodcutRouter.get("/api/:productID",getProdcutInfo)

export default prodcutRouter
