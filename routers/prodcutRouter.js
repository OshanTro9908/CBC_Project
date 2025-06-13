import express from "express";
import { createprodecut, getProducts } from "../Controller/productControll.js";

const prodcutRouter = express.Router()

prodcutRouter.post("/", createprodecut)
prodcutRouter.get("/",getProducts)

export default prodcutRouter
