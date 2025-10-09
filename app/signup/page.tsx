"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function SignupPage(){
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password:"", 
        username:""
    });

    const [error, setError] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false);
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
            console.log("signup success", res.data);
            router.push("/login");
        } catch (error:any) {
            console.log("Failed: ", error.message)
            toast.error(error.message)
        } finally{
            setLoading(false);
        }


    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2" >
            <h1>{loading ? "Processing": ""}</h1>
            <hr />
            <label htmlFor="username">username</label>
            <input
                className="border rounded-lg h-[50px]"
                id="username" 
                type="text" 
                name="username"
                value={user.username}
                placeholder="Username"
                onChange={(e) => setUser({...user, username:e.target.value})} />

            <hr />
            <label htmlFor="email">email</label>
            <input
                className="border rounded-lg h-[50px]"
                id="email" 
                type="email" 
                name="email"
                value={user.email}
                placeholder="email"
                onChange={(e) => setUser({...user, email:e.target.value})} />

            <hr />
            <label htmlFor="password">password</label>
            <input
                className="border rounded-lg h-[50px]"
                id="password" 
                type="password" 
                name="password"
                value={user.password}
                placeholder="password"
                onChange={(e) => setUser({...user, password:e.target.value})} />
                <br />
            <button
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                onClick={onSignup}
            >{buttonDisabled ? "No signup" : "Yes signup"}</button>
            <Link href="/login">Login</Link>
        </div>
    )
}