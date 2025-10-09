import mongoose, { mongo } from "mongoose";
import { unique } from "next/dist/build/utils";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    email:{
        type:String,
        required: [true, "Please provide an email"],
        unique:true,
    },
    password:{
        type:String,
        required: [true, "Please provide a password"]
    },
    isVerfied: {
        type:Boolean,
        default:false
    },
    isAdming:{
        type:Boolean,
        default:false
    },
    forgotPsswordToken:String,
    forgotPasswordTokenExpiry: Date,
    verifyToken:String,
    verifyTokenExpiry: Date,

});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;