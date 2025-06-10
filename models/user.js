import mongoose, { Schema } from "mongoose";

//create schema
const userscreama = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    }, 
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true //Email is unique
    },
    IsBlocked : {
        type : Boolean,//to check block user
        default : false
    }, 
    phone: {
        type : String,
        default : "Not Given"                                                         
    },
    role : {
        type : String,
        default : "user"
    }, // to check user type
    isEmailVerified : {
        type : Boolean,
        default : false
    }, //to verified email
    image : {
        type : String,
        default : "https://pixabay.com/vectors/user-little-man-icon-social-media-3331256/"
    }, //For profile pitchers
    salt : String
}
)

//create connector
const User = mongoose.model ("users" , userscreama)

export default User