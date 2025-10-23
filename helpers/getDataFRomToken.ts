import jwt from "jsonwebtoken"; 
import { NextRequest } from 'next/server';

export const getDataFromToken = (request: NextRequest) => {

    console.log("Request1: ", request);
    console.error("Request2: ", request);

    const token = request.cookies.get("token")?.value;
    if (!token) throw new Error("Authentication token is missing.");

    const secret = process.env.TOKEN_SECRET;
    if (!secret) throw new Error("Server misconfiguration: TOKEN_SECRET missing");

    try {
        const decoded = jwt.verify(token, secret) as { id: string };
        return decoded.id;
    } catch (error) {
        console.error("getDataFromToken:", error);
        throw new Error("Authentication token is invalid or expired.");
    }
};
