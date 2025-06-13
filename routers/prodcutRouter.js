import express from "express";
import { createprodecut } from "../Controller/productControll.js";

const prodcutRouter = express.Router()

prodcutRouter.post("/", createprodecut)

export default prodcutRouter
