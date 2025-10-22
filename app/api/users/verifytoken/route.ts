import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFRomToken";


export async function GET(request: NextRequest){
    

    try {

        const userId = getDataFromToken(request);
        
        return NextResponse.json(
            { 
                message: "Token valid", 
                success: true, 
                userId: userId 
            }, 
            { status: 200 }
        );
    } catch (error:any) {
        console.error("Token verification failed:", error.message);
        
        return NextResponse.json(
            { 
                message: "Invalid or expired token", 
                success: false 
            }, 
            { status: 401 }
        );
    }
}