import express from "express";
import Student from "../models/student.js";
import { createStudent, getStudents } from "../Controller/studentControll.js";


const studetRouter = express.Router()

//getting data
studetRouter.get("/", getStudents)

//save data
studetRouter.post("/",createStudent)

export default studetRouter