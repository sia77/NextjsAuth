// app/api/users/user/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel'; 
import { getDataFromToken } from "@/helpers/getDataFRomToken";

export async function GET(request:NextRequest){
    try {
        await connect(); 
        const userId = await getDataFromToken();

        if (!userId) {
             return NextResponse.json({ error: "Unauthorized or token missing/invalid" }, { status: 401 });
        }

        const user = await User.findOne({_id: userId}).select("-password");
        
        return NextResponse.json({
            message:"User found",
            data: user
        })
    } catch (error:any) {
        console.log("user-route-GET: ", error);
        return NextResponse.json({error: "Server error retrieving user data"}, {status:500})
    }
}
