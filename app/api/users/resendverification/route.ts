import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { sendEmail } from "@/helpers/mailer";
import { EmailType } from "@/types/EmailType";

export async function POST( request:NextRequest ){
    console.log("hello");

    try {
        await connect();
        
        const { email } = await request.json();
        console.log("email: ", email);
        const user = await User.findOne({ email });

        if(!user){
            return NextResponse.json({ message: "User not found.", success:false }, { status: 404 });
        }

        if (user.isVerified) {
            return NextResponse.json({ message: "User already verified.", success:true });
        }

        // Generate new token
        const token = crypto.randomBytes(32).toString("hex");
        const verifyToken = crypto.createHash("sha256").update(token).digest("hex");
        const verifyTokenExpiry = Date.now() + 3600000; // 1 hour

        user.verifyToken = verifyToken;
        user.verifyTokenExpiry = verifyTokenExpiry;
        const saveUser = await user.save();

        const emailSent = await sendEmail({email, emailType:EmailType.VERIFY,userId: saveUser._id});

        if(emailSent && Array.isArray(emailSent.accepted) && emailSent.accepted.length > 0){
            return NextResponse.json(
                {
                    message: "Verification email resent successfully.",
                    success: true
                },  
                { status:200 }
            );
        }else{
            return NextResponse.json(
                {
                    message: "There was an issue resending verification email. Please try again",
                    success: false
                }, 
                { status:500 }
            );
        }
        
    } catch (error:unknown) {
        console.log("resendVerification - API: ", error);
        return NextResponse.json(
            { error: "Internal Server Error"}, 
            { status: 500}
        );
    }
}