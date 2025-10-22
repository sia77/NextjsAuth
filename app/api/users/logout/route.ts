
import { NextResponse } from "next/server";

export async function GET(){
 
    try {
        const response = NextResponse.json(
            {
                message: "Logout successful", 
                success: true,
            },
            { status: 200 }
        );

        response.cookies.set("token", "", {httpOnly:true, path: '/', secure: false, sameSite: "lax", expires: new Date(0)});
        return response;
        
    } catch (error:any) {
        return NextResponse.json(
            {
                message: error.message,
                success: false
            }, 
            { status: 500 }
        );
    }
}