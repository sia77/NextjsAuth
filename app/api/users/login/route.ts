import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request:NextRequest){
    try {

        await connect();
        const reqBody = await request.json();
        const { email, password} = reqBody;

        console.log(reqBody);

        //check if the user already exists
        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({error: "Invalid Username/password combination" }, {status:404})
        }

        //check if password is correct
        const validPassword = await bcrypt.compare(password, user.password);


        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status:400});
        }

        //Create token data
        const tokenData = {
            id:user._id,
            username: user.username,
            email: user.email
        }

        //Create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1h"});

        const response = NextResponse.json({
            message: "Login successful",
            success:true,
        });

        response.cookies.set("token", token, {httpOnly:true, path: '/', secure: false, sameSite: "lax"})

        return response;
        
    } catch (error:any) {
        console.log("error:", error);
        return NextResponse.json({error: error.message},
            {status: 500}
        )
    }
}
