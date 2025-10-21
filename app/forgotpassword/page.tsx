"use client"

import axios from "axios";
import { useState } from "react";
import Ticker from "../components/tiker";

export default function ForgotPasswordPage(){

    const [ loading, setLoading] = useState(false);
    const [ email, setEmail] = useState("");
    const [ success, setSuccess] = useState(false);
    const [ resMessage, setResMessage] = useState("");

    const forgotPassword = async() => {
        if(!formValidated()) return;
        
        //API call
        try {
            setLoading(true);
            const response = await axios.post("/api/users/forgotpassword", {email});
            setResMessage(response.data.message);
            setSuccess(true);
            
        } catch (error:any) {
            console.error( "forgotPassword:", error );
            setResMessage( error.response?.data?.message || error.message || "An error occurred" );
            setSuccess( false );
        }finally{
            setLoading(false);
        }
    }

    const formValidated = () => {
        const trimmedEmail = email.trim();
        
        if(!trimmedEmail){
            setResMessage("The field can not be blank");
            setSuccess(false);
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) {
            setResMessage("Please enter a valid email address");
            setSuccess(false);
            return false;
        }

        return true;
    }

    return(     
        
        <div className="flex justify-around items-center h-full">
            <div className="flex flex-col w-[400px] h-auto bg-white text-black rounded-lg p-4">                
                <div className="" >
                    <h1 className="font-bold text-center mb-3">Forgot Password</h1>
                    {
                        resMessage && ( 
                            <div className={`border px-4 py-3 rounded mb-4 text-sm ${ success ? "bg-green-100 border-green-400 text-green-700" :"bg-red-100 border-red-400 text-red-700" }`} role="alert" >{ resMessage }</div>
                        )                    
                    }
                    <form onSubmit={(e) => { e.preventDefault(); forgotPassword(); }}>
                        <fieldset disabled={loading}>
                            <div className="flex flex-col mb-3">
                                <label className="font-bold" htmlFor="email">Email</label>
                                <input
                                    className="border rounded-lg h-[50px] pl-2"
                                    id="email" 
                                    type="text" 
                                    name="email"
                                    value={email}
                                    placeholder="Email address"
                                    onChange={(e) => setEmail(e.target.value)} 
                                    />
                            </div>

                            <div className="flex flex-col mb-3">
                                <button 
                                    disabled={loading}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer h-[50px]"
                                    >{loading? <Ticker />: "Submit"}</button>
                            </div>
                        </fieldset>
                    </form>

                </div>
            </div>
        </div>
    )
}