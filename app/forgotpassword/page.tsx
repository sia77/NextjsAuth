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
            console.log("in try block")
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
            <div>
                <div className="flex flex-col bg-white w-[400px] rounded mb-4">
                    {error && (
                        <div className="flex items-center border-green-400 text-green-700 p-4 rounded text-sm" role="alert">
                            <p>{error}</p>
                        </div>
                    )}
                    {responseMessage && (
                        <div className="flex items-center border-green-400 text-green-700 p-4 rounded text-sm" role="alert">
                            <p>{responseMessage}</p>
                        </div>
                    )}
                </div>

                <div className="flex flex-col w-[400px] h-[200px] bg-white text-black rounded-lg p-5">
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
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer h-[50px]"
                        onClick={forgotPassword}>{loading? <Ticker />: "Submit"}</button>
                    </div>
                </div>
            </div>
        </div>
    )

}