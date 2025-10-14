"use client"

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function verifyemailPage(){
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            const res = await axios.post('/api/users/verifyemail', {token});
            setVerified(true);
        } catch (error:any) {
            console.log("verifyEmailPage: ", error);
            setError(true);            
        }
    }

    useEffect(()=>{
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken);
    }, []);

    useEffect(() => {
        if(token?.length > 0 ){
            verifyUserEmail();
        }
    }, [token]);


    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2" >
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black rounded-2xl mt-4">{token ? `${token}` : "no token"}</h2>
            {verified && (
                <div>
                    <h2 className="text-2xl"> Email Verified</h2>
                    <Link href="/login">
                        Login
                    </Link>
                </div>
            )}

            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500"> Email not Verified</h2>
                </div>
            )}

        </div>
    )

}