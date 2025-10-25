import jwt from "jsonwebtoken"; 
import { NextRequest } from 'next/server';

export const getDataFromToken = (request: NextRequest) => {


    console.log("Request4: ", request.headers.get("cookie"));

    //const token = request.cookies.get("token")?.value;

    const token = request.headers.get("cookie")?.split("=")[1];

    console.log("****Token: ", token);

    if (!token) throw new Error("Authentication token is missing.");

    const secret = process.env.TOKEN_SECRET;
    console.log("****secret: ", secret);
    if (!secret) throw new Error("Server misconfiguration: TOKEN_SECRET missing");

    try {
        const decoded = jwt.verify(token, secret) as { id: string };
        console.log("****decoded: ", decoded);
        return decoded;
    } catch (error) {
        console.error("getDataFromToken:", error);
        throw new Error("Authentication token is invalid or expired.");
    }
};
