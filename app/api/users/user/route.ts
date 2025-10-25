// app/api/users/user/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel'; 
import { getDataFromToken } from "@/helpers/getDataFRomToken";

export async function GET(request:NextRequest){

    console.log("Request5: ", request);
    try {
        await connect(); 
        const userResp = getDataFromToken(request);

        console.log("userResp: ", userResp);
        console.log("userResp.id: ", userResp.id);

        if (!userResp.id) {
             return NextResponse.json(
                { 
                    message: "Unauthorized or token missing/invalid", 
                    success:false 
                }, 
                { status: 401 });
        };

        const user = await User.findOne({_id: userResp.id}).select("-password");

        console.log("UserDB ", user);
        
        return NextResponse.json(
            {
                message:"User found",
                data: user,
                success:true
            },
            { status: 200 }
        );
    } catch (error:unknown) {
        console.log("user-route-GET: ", error);
        return NextResponse.json(
            {
                message: "Server error retrieving user data",
                success:false
            },
            {status:500}
        );
    }
}
