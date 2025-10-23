import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request:NextRequest){
    try {

        await connect();
        const { email, password} = await request.json();

        //check if the user already exists
        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json(
                { 
                    message: "Invalid Username/password combination", 
                    success:false 
                }, 
                { status:404 }
            )
        }

        //check if password is correct
        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword){
            return NextResponse.json(
                { 
                    message: "Invalid password", 
                    success:false 
                }, 
                { status:400 }
            );
        }

        //Create token data
        const tokenData = {
            id:user._id,
            username: user.username,
            email: user.email
        }

        //Create token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1h"});

        const response = NextResponse.json(
            {
                message: "Login successful",
                success:true,
            }, 
            { status: 200 }
        );

        console.info("****Vercel: ", process.env.NODE_ENV === "production" );

        response.cookies.set("token", token, {
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV === "production", 
            sameSite: "lax",
        });

        return response;
        
    } catch (error:unknown) {

        console.error("error:", error);
       
        return NextResponse.json(
            { 
                message:"Internal server error", 
                success:false 
            },
            { status: 500 }
        )
    }
}
