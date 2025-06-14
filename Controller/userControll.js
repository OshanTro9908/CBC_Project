import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//for createing user create function
export function createUser(req,res){
    
    //hashing generater with 10 time hashing
    const passwordHash = bcrypt.hashSync(req.body.password,10) 
    
    //create user data 
    const userData = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : passwordHash
    }

    //creating user with using UserData    
    const user = new User(userData)
     
    //user save funtion
    user.save().then(
        ()=>{
            res.json(
                {
                    message : "User created successfully"
                }
            )
        }
    ).catch(
        ()=>{
            res.json(
                {
                    message : "Failed to create user"
                }
            )
        }
    )
    
}

//create user loging function
export function loginUser(req,res) {
    const email = req.body.email
    const password = req.body.password

    User.findOne({
        email : email
    }).then(
        (user)=>{if(user == null){//when user not found
            res.status(404).json(
                {
                    message : "User not found"               }
            )}else{//when user found
                const isPasswordCorrect = bcrypt.compareSync(password,user.password)//password chack with database
                if(isPasswordCorrect){
                   
                    //create user token
                   const token = jwt.sign({
                    email : user.email,
                    firstName : user.firstName,
                    lastName : user.lastName,
                    role : user.role,
                    IsBlocked : user.IsBlocked,
                    Image : user.image,
                    isEmailVerified : user.isEmailVerified
                   },
                   "cbc-6503" //encrypt key
                   )
                   console.log(token)

                    res.json(
                        {
                            token : token,
                            message : "Loging Sucsseful"
                        }
                    )
                }else{
                    res.status(403).json(
                        {
                            message : "Password is not correct"
                        }
                    )
                }
            }
        }
    )
}

export function isAdmin(req){
    //check login
    if(req.users == null){
        return false
    }

    //check user role
    if(req.user.role == "admin"){
        return true
    }else{
        return false
    }
}

