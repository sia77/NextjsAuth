"use client"

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Ticker from "../components/tiker";

export default function VerifyEmailPage(){
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [errorStatus, setErrorStatus] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [canResend, setCanResend] = useState(false);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [sucess, setSucess] = useState(false);
    const [sucessMessage, setSucessMessage] = useState(false);

    const verifyUserEmail = async () => {
        try {
            const res = await axios.post('/api/users/verifyemail', {token});
            setVerified(true);
        } catch (error:any) {
            const resData = error?.response?.data;
            setErrorStatus(!resData?.tokenStatus);
            setErrorMessage(resData?.error || "Something went wrong.");
            setCanResend(resData?.canResend || false);            
        }
    }

    const resendVerification = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/resendverification", {email});
            console.log("Response: ", response.data.message);
            setSucess(response.data.sucess);
            setSucessMessage(response.data.message)
        } catch (error:any) {
            setErrorStatus(true);
            setErrorMessage(error.message);
            setLoading(false);
        }finally{
            setLoading(false);
        }        
    }

    useEffect(()=>{
        const params = new URLSearchParams(window.location.search);
        const urlToken = params.get("token");
        if (urlToken) setToken(urlToken);
    }, []);

    useEffect(() => {
        if(token?.length > 0 ){
            verifyUserEmail();
        }
    }, [token]);


    return(
        <div className="flex justify-around items-center h-full">
            <div className="flex flex-col w-[400px] h-auto bg-white text-black rounded-lg p-4">
                <h1 className="text-4xl mb-3">Verify Email</h1>
                {verified && (
                    <div>
                        <h2 className="text-2xl"> Email Verified</h2>
                        <Link href="/login">
                            Login
                        </Link>
                    </div>
                    )
                }

                {errorStatus && (
                    <div className="flex flex-col">
                        <div>
                            <h2 className="text-2xl bg-red-100 rounded-2xl p-1">{errorMessage}</h2>
                        </div>
                        
                        {canResend && (
                            <div className="flex flex-col mt-4">

                                <input 
                                    className="border border-gray-600 rounded-lg h-[50px] pl-2" 
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button 
                                    disabled={loading}
                                    onClick={ resendVerification } 
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer h-[50px] mt-4"
                                >{loading?  <Ticker />: "Resend a verification code"}</button>
                            </div>
                            )
                        }
                    </div>
                )}

                {sucess && (
                    <div className="flex flex-col">
                        <div>
                            <h2 className="text-2xl bg-green-100 rounded-2xl p-1">{sucessMessage}</h2>
                        </div>
                        
                        {/* {canResend && (
                            <div className="flex flex-col mt-4">

                                <input 
                                    className="border border-gray-600 rounded-lg h-[50px] pl-2" 
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button 
                                    disabled={loading}
                                    onClick={ resendVerification } 
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer h-[50px] mt-4"
                                >{loading?  <Ticker />: "Resend a verification code"}</button>
                            </div>
                            )
                        } */}
                    </div>
                )}
            </div>
        </div>
    )
}