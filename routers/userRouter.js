import express from "express";
import { createUser, loginUser } from "../Controller/userControll.js";

const userRouter = express.Router()

//create user
userRouter.post("/",createUser)

//for user login
userRouter.post("/login", loginUser)

export default userRouter