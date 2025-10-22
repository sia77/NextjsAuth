import * as jwt from 'jsonwebtoken'; 
import { NextRequest } from 'next/server';

export const getDataFromToken = (request:NextRequest) => { 

    const token = request.cookies.get("token")?.value || ""; 

    if (!token) {
        throw new Error("Authentication token is missing."); 
    }

    try {
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);        
        return decodedToken.id;
    } catch (error:any) {
        console.log("getDataFromToken: ", error);
        throw new Error("Authentication token is invalid."); 
    }
}
