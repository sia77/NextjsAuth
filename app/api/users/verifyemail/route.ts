import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

export async function POST(request: NextRequest){
    
    try {
        await connect();
        const { token } = await request.json();

        const user = await User.findOne({
            verifyToken: token            
        })

        if(!user){
            return NextResponse.json(
                {
                    message: "Invalid token. Check the email we sent out for a valid link + token",
                    success: false,
                    canResend: false,
                }, 
                { status: 400 }
            );
        }

        if(user.verifyTokenExpiry < Date.now()){
            return NextResponse.json(
                {
                    message: "Verification link has expired.", 
                    success: false,
                    canResend: true
                }, 
                { status: 400 }
            );
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        const userSaved = await user.save();

        return NextResponse.json({
            message:"Email verified successfully",
            success:true
        })

    } catch (error:any) {
        console.log("email Verify - api - POST", error);
        return NextResponse.json(
            {
                message: "Server error verifying email",
                success: false
            }, 
            { status:500 }
        )
    }
}