"use client"
import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Ticker from "../components/tiker";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage(){
    const searchParams = useSearchParams();
    const router = useRouter();
    const [user, setUser] = useState({ email: "", password:""});      
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [responseMsg, setResponseMsg] = useState("");
    const [source, setSource] = useState(searchParams.get('from') === "signup");

    
    const validateForm = () =>{

        if( user.email.length === 0 || user.password.length === 0 ){
            setResponseMsg("All fields are required");
            setSuccess(false);
            return false;
        }

        if (user.email && !emailRegex.test(user.email)) {
            setResponseMsg('Please enter a valid email address.');
            return false;
        }

        return true;
    }

    const IsUserVerified = async() => {
        if(!validateForm()) return;
        setSource(false);

        try {
            setLoading(true);
            const response = await axios.post('api/users/verifieduser', user);
            setSuccess(response.data.success);
            setResponseMsg(response.data.message);
            return (response.data.success);            
            
        } catch (error:any) {
            console.log("login12: ", error);
            setSuccess(error.response?.data?.success);
            setResponseMsg(error.response?.data?.message);            
            return false;
        }finally{
            setLoading(false);
        }
    }

    const onLogin = async() => {
        const verified = await IsUserVerified();
        if (!verified) return; 
        
        try {
            setLoading(true);
            const response = await axios.post('api/users/login', user);
            console.log("Login response: ", response.data);
            router.push('/profile');            
            
        } catch (error:any) {
            console.log("login1: ", error.message);
            setSuccess(error.response?.data?.success);
            setResponseMsg(error.response?.data?.message);
        }
        finally{
            setLoading(false);
        }
    }
    return (
        <div className="flex justify-around items-center h-full">
            <div className="flex flex-col w-[400px] h-auto bg-white text-black rounded-lg p-4">                
                <div className="" >
                    <h1 className="font-bold text-center mb-3">Login</h1>
                    {
                        responseMsg && (<div className={`border px-4 py-3 rounded mb-4 text-sm ${ success ? "bg-green-100 border-green-400 text-green-700" :"bg-red-100 border-red-400 text-red-700" }`} role="alert" >{ responseMsg }</div>)                    
                    }
                    {
                        source && (<div className="bg-green-100 border px-4 py-3 rounded mb-4 text-sm border-green-400 text-green-700" role="alert" >Please check your inbox for an email verification link.</div>)                    
                    }

                    <div className="flex flex-col mb-3">
                        <label htmlFor="email" className="font-bold">email</label>
                        <input
                            className="border border-gray-600 rounded-lg h-[50px] pl-2"
                            id="email" 
                            type="email" 
                            name="email"
                            value={user.email}
                            placeholder="email"
                            onChange={(e) => setUser({...user, email:e.target.value})} />
                    </div>

                    <div className="flex flex-col mb-3">
                        <label htmlFor="password" className="font-bold">password</label>
                        <input
                            className="border border-gray-600 rounded-lg h-[50px] pl-2"
                            id="password" 
                            type="password" 
                            name="password"
                            value={user.password}
                            placeholder="password"
                            onChange={(e) => setUser({...user, password:e.target.value})} />
                    </div>
                    <div className="flex flex-col">
                        <button
                            disabled ={loading}
                            onClick={onLogin} 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer h-[50px] mb-4"    
                        >{loading?  <Ticker />: "Login"}</button>
                        <Link className="underline" href="/signup">Sign Up</Link>
                        <Link className="underline" href="/forgotpassword">Forgot my password</Link>
                    </div>
                        

                </div>
            </div>
        </div>
    )
}