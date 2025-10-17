"use client"

import axios from "axios";
import { useState } from "react";
import Ticker from "../components/tiker";

export default function ForgotPasswordPag(){

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    const forgotPassword = async() => {
        if(!formValidated()) return;
        
        //API call
        try {
            setLoading(true);
            const response = await axios.post("/api/users/forgotpassword", {email});
            setResponseMessage(response.data.message);
            
        } catch (error:any) {
            console.log("forgotPassword: ", error);
            setError(error.message);
            setLoading(false);
        }finally{
            setLoading(false);
        }
    }

    const formValidated = () => {
        setError("");
        if(!email){
            setError("The field can not be blank");
            return false;
        }
        return true;
    }

    return(     
        
        <div className="flex justify-around items-center h-full">
            <div className="flex flex-col w-[400px] h-auto bg-white text-black rounded-lg p-4">                
                <div className="" >
                    <h1 className="font-bold text-center mb-3">Forgot Password</h1>
                    {error && (
                         <div className="text-2xl bg-red-100 rounded-lg p-2 mb-2">{ error }</div>
                        )
                    }
                    {responseMessage && (
                        <div className="text-2xl bg-red-100 rounded-lg p-2 mb-2">{ responseMessage }</div>
                        )
                    }

                    <div className="flex flex-col mb-3">
                        <label className="font-bold" htmlFor="email">Email</label>
                        <input
                            className="border rounded-lg h-[50px] pl-2"
                            id="email" 
                            type="email" 
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
                            onClick={forgotPassword}>{loading? <Ticker />: "Submit"}</button>
                    </div>

                </div>
            </div>
        </div>
    )
}