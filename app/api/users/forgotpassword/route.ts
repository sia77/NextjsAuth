import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { EmailType } from "@/types/EmailType";
import { sendEmail } from "@/helpers/mailer";

export async function POST(request: NextRequest){

    try {
        await connect();
        const { email } = await request.json();

        //check if the user already exists
        const user = await User.findOne({email});

        if(!user){
            console.log(`forgot password - API: ${email} doesn't exists`, )
            return NextResponse.json(
                { message: "You should have received an email in your inbox for password recovery." }, 
                { status: 200}
            );
        }

        //Send verification email
        const emailSent = await sendEmail({email, emailType:EmailType.RESET,userId: user._id});

        if(emailSent && Array.isArray(emailSent.accepted) && emailSent.accepted.length > 0){
            return NextResponse.json(
                {
                    message: "You should have received an email in your inbox for password recovery.",
                    success: true
                },  
                { status:200 }
            );
        }else{
            return NextResponse.json(
                {
                    message: "There was an issue sending password reset email. Please try again",
                    success: false
                }, 
                { status:500 }
            );
        }
        
    } catch (error:any) {
        console.log("forgotpassword - API: ", error);
        return NextResponse.json(
            {
                "message": "There was an issue processing your request. Please try again later.",
                success: false
            },
            { status: 500 }
        )
    }

}

