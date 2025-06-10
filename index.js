// libeary import
import express from "express";
import mongoose, { Mongoose } from "mongoose";
import bodyParser from "body-parser"; 
import Student from "./models/student.js";
import studetRouter from "./routers/studentRouter.js";
import userRouter from "./routers/userRouter.js";
import jwt from "jsonwebtoken";

//call express fuction for variable and use const cmd because of this veriable is consatnce
const app = express();

//call database location and username and password
const connectionString = "mongodb+srv://admin:123@cluster0.hufzvij.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

//using bodypasser for clear reqesut body. use cmd use for middeleware
app.use(bodyParser.json())

//creat midelware for checking token
app.use(
    (req,res,next)=>{//req,res and next function
        console.log("Request Recivied")
        const tokenRead = req.header("Authorization")//read https request authorization
        if(tokenRead != null){
             const token = tokenRead.replace("Bearer ","") //remove bearer head
             console.log(token)
            jwt.verify(token,"cbc-6503",
                (err,decoded)=>{//if erroe come into error and decode come to decode
                    console.log(decoded)
                    if(decoded == null){
                        res.status(403).json({
                            message : "Unautorized"
                        })
                    }else{
                        req.user = decoded // creat user with decoding token for http request. You can req.user or req.other_name
                        next()//run next step
                    }
                    
                }
            )
        }
       
        next()//Run next function
    }
)

//database connect, then use for if correct and catch use for else
mongoose.connect(connectionString).then(
    ()=>{console.log("Database is connected")}
).catch(
    ()=>{console.log("Failed to coonect to the database")}
)

//routers connect
app.use("/students",studetRouter)
app.use("/users", userRouter)

//programe runing code
app.listen(5000 , ()=>{
    console.log("Server is running on port 5000")
})

