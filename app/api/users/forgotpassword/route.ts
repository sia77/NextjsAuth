import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { EmailType } from "@/types/EmailType";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest){

    try {
        
        const reqBody = await request.json();
        const { email } = reqBody;

        //check if the user already exists
        const user = await User.findOne({email});

        if(!user){
            console.log(`forgot password - API: ${email} doesn't exists`, )
            NextResponse.json({message: "You should have received an email in your inbox for password recovery."}, {status: 200})
        }

        //user does exists, so send out am email
        // user.isVerified = true;
        // user.verifyToken = undefined;
        // user.verifyTokenExpiry = undefined;
        // const saveUser = await user.save();

        //Send verification email
        const emailSent = await sendEmail({email, emailType:EmailType.RESET,userId: user._id});

        return NextResponse.json({
            message:"You should have received an email in your inbox for password recovery.",
        })
        
    } catch (error:any) {
        console.log("forgotpassword - API: ", error);
        return NextResponse.json({"message": "You should have received an email in your inbox for password recovery."})
    }



}

