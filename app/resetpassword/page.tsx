"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import Ticker from "../components/tiker";
import Link from "next/link";

export default function ResetPasswordPage(){

    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        
        const params = new URLSearchParams(window.location.search);
        const tokenStr = params.get('token');
        
        if (tokenStr) {
            setToken(tokenStr);
        } else {
            setMsg("Invalid link. The password reset token is missing from the URL.");
        }        

    }, []); 

    const resetPassword = async() => {

        if (!validateForm()) {
            return; 
        }

        try {
            setLoading(true);
            const res = await axios.post("/api/users/resetpassword", {token, password})
            setSuccess(res.data.success);
            setMsg(res.data?.message);

            
        } catch (error:any) {
            setSuccess(error?.response?.data?.success);
            setMsg(error?.response?.data?.message);
            throw new Error(error.message)
        }finally{
            setLoading(false);
        }
    }

    const validateForm = () => {
        setMsg("");

        if(!token){
            setMsg("Token is missing. Please use the link from your email.");
            return false;
        }

        if(password.length < 8 ){
            setMsg("Password must be at least 8 characters.");
            return false;
        }

        if(password !== confirmPassword){
            setMsg("Passwords do not match.");
            return false;
        }

        return true;
    }


    return (
        <div className="flex justify-around items-center h-full">
            <div className="flex flex-col w-[400px] h-auto bg-white text-black rounded-lg p-4  ">
                    <div className="" >
                        <h1 className="font-bold text-center mb-3">Reset Password</h1>

                        {msg && (
                            <div className={`border px-4 py-3 rounded mb-4 text-sm ${ success ? "bg-green-100 border-green-400 text-green-700" :"bg-red-100 border-red-400 text-red-700" }`}>
                                {msg}
                            </div>
                        )}


                        <div className="flex flex-col mb-3">
                            <label className="font-bold">New password</label>
                            <input
                                className="border border-gray-600 rounded-lg h-[50px] pl-2" 
                                type="password"
                                value ={password}
                                placeholder="Password" 
                                onChange={(e)=> setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col mb-[30px]">
                            <label className="font-bold">Confirm password</label>
                            <input
                                className="border border-gray-600 rounded-lg h-[50px] pl-2" 
                                type="password"
                                value ={confirmPassword}
                                placeholder="Password"
                                onChange={(e)=> setConfirmPassword(e.target.value)} 
                            />
                        </div>
                        <div className="flex flex-col">
                            <button
                                onClick={resetPassword} 
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer h-[50px] mb-3"    
                                >{loading?  <Ticker />: "Submit"}</button>
                                <Link className="underline" href="/login">Login</Link>
                        </div>
                    </div>
            </div>
        </div>     
    )
}