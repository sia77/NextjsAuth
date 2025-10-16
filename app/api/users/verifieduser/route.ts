import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel"
import bcrypt from "bcryptjs";

export async function POST(request:NextRequest){

    try {
        await connect();
        const { email, password } = await request.json();
        const user = await User.findOne({email});

        if(!user){
            return NextResponse.json(
                { 
                    message: "User doesn't exist", 
                    success:false 
                }, 
                { status:401 }
            );
        }

        if(!user.isVerified){
            return NextResponse.json(
                {
                    message: "Email address is not verified", 
                    success:false
                }, 
                { status:401 }
            );
        }

        if (user.verifyTokenExpiry && user.verifyTokenExpiry < Date.now()) {
            return NextResponse.json(
                { 
                    message: "Verification token expired", 
                    success:false 
                }, 
                { status: 401 }
            );
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { 
                    message: "Invalid password", 
                    success:false 
                }, 
                { status: 400 }
            );
        }

        return NextResponse.json(
            { 
                message: "User is verified", 
                success:true 
            }, 
            { status:200 }
        );

        
    } catch (error:any) {
        console.log("Verified user - API: ", error );
        return NextResponse.json(
            { 
                message: "Server error verifying user", 
                success:false 
            }, 
            { status:500 }
        );
    }
}

