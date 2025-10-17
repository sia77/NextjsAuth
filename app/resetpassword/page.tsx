"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import Ticker from "../components/tiker";

export default function ResetPasswordPage(){

    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        
        const params = new URLSearchParams(window.location.search);
        const tokenStr = params.get('token');
        
        if (tokenStr) {
            setToken(tokenStr);
        } else {
            setError("Invalid link. The password reset token is missing from the URL.");
        }        

    }, []); 

    const resetPassword = async() => {

        if (!validateForm()) {
            return; 
        }

        try {
            setLoading(true);
            console.log("token: ", token);
            const res = await axios.post("/api/users/resetpassword", {token, password})
            console.log("res: ", res.data);
            setSuccess(res.data.success);

            
        } catch (error:any) {
            console.log("resetPassword: ", error);
            setSuccess(error?.response?.data?.success);
            setError(error.message);
            throw new Error(error.message)
        }finally{
            setLoading(false);
        }
    }

    const validateForm = () => {
        setError("");

        if(!token){
            setError("Token is missing. Please use the link from your email.");
            return false;
        }

        if(password.length < 8 ){
            setError("Password must be at least 8 characters.");
            return false;
        }

        if(password !== confirmPassword){
            setError("Passwords do not match.");
            return false;
        }

        return true;
    }


    return (
        <div className="flex justify-around items-center h-full">
            <div className="flex flex-col w-[400px] h-auto bg-white text-black rounded-lg p-4  ">

                {error && (
                    <div className={`bg-red-100 border px-4 py-3 rounded mb-4 text-sm ${ success ? "border-green-400 text-green-700" :"border-red-400 text-red-700" }`}>
                        <p className="font-semibold">Error:</p>
                        <p>{error}</p>
                    </div>
                )}


                <div className="flex flex-col mb-3">
                    <label className="font-bold">New password</label>
                    <input
                        className="border border-gray-600 rounded-lg h-[50px] pl-2" 
                        type="password"
                        value ={password}
                        placeholder="" 
                        onChange={(e)=> setPassword(e.target.value)}
                    />
                </div>
                <div className="flex flex-col mb-[30px]">
                    <label className="font-bold">Confirm password</label>
                    <input
                        className="border border-gray-600 rounded-lg h-[50px] pl-2" 
                        type="password"
                        value ={confirmPassword}
                        placeholder=""
                        onChange={(e)=> setConfirmPassword(e.target.value)} 
                    />
                </div>
                <div className="flex flex-col">
                    <button
                        onClick={resetPassword} 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer h-[50px]"    
                        >{loading?  <Ticker />: "Submit"}</button>
                </div>
            </div>
        </div>     
    )
}