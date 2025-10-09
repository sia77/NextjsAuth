import { cookies } from 'next/headers'; // Must import this!
import * as jwt from 'jsonwebtoken'; // Assuming you import jwt


export const getDataFromToken = async() => { 
    try {
        // Read cookies directly from the request context
        const token = (await cookies()).get("token")?.value;        

        if (!token) return null;
        
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedToken.id;
    } catch (error:any) {
        console.log("getDataFromToken: ", error);
        return null; // Return null on failure
    }
}
