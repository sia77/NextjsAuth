"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Ticker from "../components/tiker";


export default function SignupPage(){
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password:"", 
        username:""
    });

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [success, setSuccess] = useState(false);
    const [responseMsg, setResponseMsg] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if( user.email.length > 0  && 
            user.password.length > 0 && 
            user.username.length > 0 ){
                setButtonDisabled(false);
        }else {
            setButtonDisabled(true);
        }

    }, [user])

    const onSignup = async() => {

        try {
            setLoading(true);
            const res = await axios.post("/api/users/signup", user);
            setSuccess(res.data.success);
            setResponseMsg(res.data.message);
            console.log("signup success", res.data);
            router.push("/login?from=signup&msg=verify-email");
        } catch (error:any) {
            console.log("Failed: ", error.message)
            setSuccess(error.response?.data?.success);
            setResponseMsg(error.response?.data?.message);
        } finally{
            setLoading(false);
        }
    }

    return (

        <div className="flex justify-around items-center h-full">
            <div className="flex flex-col w-[400px] h-auto bg-white text-black rounded-lg p-4">
                <div className="" >
                    <h1 className="font-bold text-center mb-3">Signup</h1>

                    {
                        responseMsg && (<div className={`text-2xl rounded-lg p-2 mb-2 ${success ? "bg-green-100" : "bg-red-100"}` } >{responseMsg}</div>)                    
                    }

                    <div className="flex flex-col mb-3">
                        <label className="font-bold" htmlFor="username">username</label>
                        <input
                            className="border rounded-lg h-[50px] pl-2"
                            id="username" 
                            type="text" 
                            name="username"
                            value={user.username}
                            placeholder="Username"
                            onChange={(e) => setUser({...user, username:e.target.value})} />
                    </div>

                    <div className="flex flex-col mb-3">
                        <label className="font-bold" htmlFor="email">email</label>
                        <input
                            className="border rounded-lg h-[50px] pl-2"
                            id="email" 
                            type="email" 
                            name="email"
                            value={user.email}
                            placeholder="email"
                            onChange={(e) => setUser({...user, email:e.target.value})} />
                    </div>

                    <div className="flex flex-col mb-3">
                        <label className="font-bold" htmlFor="password">password</label>
                        <input
                            className="border rounded-lg h-[50px] pl-2"
                            id="password" 
                            type="password" 
                            name="password"
                            value={user.password}
                            placeholder="password"
                            onChange={(e) => setUser({...user, password:e.target.value})} />
                    </div>

                    <div className="flex flex-col">
                        <button
                            disabled={loading || buttonDisabled}
                            onClick={onSignup} 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer h-[50px] mb-4"    
                        >{loading?  <Ticker />: "Signup"}</button>
                        <Link className="underline" href="/login">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}