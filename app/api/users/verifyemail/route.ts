import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel"

connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const { token } = reqBody;
        console.log("Token: ", token);

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: {$gt: Date.now()}
        })

        if(!user){
            return NextResponse.json({error: "Invalid token"}, {status: 400});
        }

        console.log("Verify user: ", user);

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        console.log("user: ", user);
        await user.save();

        return NextResponse.json({
            message:"Email verified successfully",
            sucess:true
        })

    } catch (error:any) {
        console.log("email Verify - api - POST", error);
        return NextResponse.json({error: "Server error verifying email"}, {status:500})
    }
}