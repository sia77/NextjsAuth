import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import { EmailType } from "@/types/EmailType";



export async function POST(request:NextRequest){
    try {

        await connect();
        const {username, email, password} = await request.json();

        console.log({username, email, password});

        //check if the user already exists
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json(
                {
                    error: "User already exists", 
                    success:false 
                }, 
                { status:409 }
            );
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const saveUser = await newUser.save();

        //Send verification email
        const emailSent = await sendEmail({ email, emailType:EmailType.VERIFY, userId: saveUser._id });

        if(emailSent && Array.isArray(emailSent.accepted) && emailSent.accepted.length > 0){
            return NextResponse.json(
            {
                message: "User created successfully",
                success: true,
                saveUser
            }, 
            { status: 201 }
        );
        }else{
            return NextResponse.json(
                {
                    message: "There was an issue resending verification email. Please try again",
                    success: false
                },
                { status: 500}
            );
        }
        
    } catch (error:any) {
        return NextResponse.json(
            { 
                error: error.message,
                success:false
            },
            { status: 500 }
        )
    }
}
