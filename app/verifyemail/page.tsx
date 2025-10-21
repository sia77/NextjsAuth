"use client"

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Ticker from "../components/tiker";

export default function VerifyEmailPage(){
    const [token, setToken] = useState("");
    //const [verified, setVerified] = useState(false);
    const [canResend, setCanResend] = useState(false);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [responseMsg, setResponseMsg] = useState("");

    const verifyUserEmail = async () => {
        try {
            const res = await axios.post('/api/users/verifyemail', {token});
            setResponseMsg(res?.data?.message || "Something went wrong.");
            setCanResend(res?.data?.canResend || false);
            setSuccess(res?.data?.success);
        } catch (error:any) {
            setResponseMsg(error?.response?.data?.message || "Something went wrong.");
            setCanResend(error?.response?.data?.canResend || false);
            setSuccess(error?.response?.data?.success);            
        }
    }

    const resendVerification = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/resendverification", {email});
            setSuccess(response.data.success);
            setResponseMsg(response.data.message)
        } catch (error:any) {
            setResponseMsg(error?.response?.data.message);
        }finally{
            setLoading(false);
        }        
    }

    useEffect(()=>{
        const params = new URLSearchParams(window.location.search);
        const urlToken = params.get("token");
        if (urlToken){
            setToken(urlToken);
        }else{
            setSuccess(false);
            setResponseMsg("Verification token is missing. Check the email we sent out for a valid link + token")
        } 
    }, []);

    useEffect(() => {
        if(token?.length > 0 ){
            verifyUserEmail();
        }
    }, [token]);

 
    return(
        <div className="flex justify-around items-center h-full">
            <div className="flex flex-col w-[400px] h-auto bg-white text-black rounded-lg p-4">
                <h1 className="font-bold text-center mb-3">Verify Email</h1>
                    {
                        responseMsg && (<div className={`border px-4 py-3 rounded mb-4 text-sm ${ success ? "bg-green-100 border-green-400 text-green-700" :"bg-red-100 border-red-400 text-red-700" }`} role="alert" >{ responseMsg }</div>)                    
                    }
                                      
                    {canResend && (
                        <div className="flex flex-col">
                            <label htmlFor="email" className="font-bold">email</label>
                            <input 
                                className="border border-gray-600 rounded-lg h-[50px] pl-2" 
                                type="email"
                                id="email"
                                name="email"
                                placeholder="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button 
                                disabled={ loading }
                                onClick={ resendVerification } 
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer h-[50px] mt-4"
                            >{loading?  <Ticker />: "Resend a verification code"}</button>
                        </div>
                        )
                    }

                    <Link className="underline" href="/signup">Sign Up</Link>
                    <Link className="underline" href="/login">
                        Login
                    </Link>
            </div>
        </div>
    )
}