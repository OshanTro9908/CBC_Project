import mongoose, { Schema } from "mongoose";

//create schema format
const studentSchema = new mongoose.Schema(
    {
        name : String,
        age : Number,
        email : String,

    }
)

//cereate connector
const Student = mongoose.model("student", studentSchema)

//export 
export default Student;