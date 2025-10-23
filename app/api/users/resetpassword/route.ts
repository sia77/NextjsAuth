
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";



export async function POST(request: NextRequest){

    try {
        await connect();

        const {token, password} = await request.json();

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: {$gt: Date.now()}
        })
        
        if(!user){
            console.log("User doesn't exist? ", user);
            return NextResponse.json(
                { 
                    message: "Invalid token", 
                    success:false 
                }, 
                { status: 401 }
            );
        }

        user.isVerified = true;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        user.password = hashedPassword;
        console.log("user: ", user);
        const savedUser = await user.save();

        console.log("savedUser: ", savedUser);

        return NextResponse.json(
            {
                message:"Password successfully reset.",
                success:true
            },
            { status:201 }
        )
        
    } catch (error:unknown) {
        console.log("resetpassword - API: ", error);
        NextResponse.json(
            { 
                message:  "Internal server error", 
                success:false },
            { status:500 }
        );
    }
}

