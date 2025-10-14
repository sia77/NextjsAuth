"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Ticker from "../components/tiker";


export default function LoginPage(){
    const router = useRouter();
    const [user, setUser] = useState({ email: "", password:""});
    const [error, setError] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onLogin = async() => {
        try {
            setLoading(true);
            const response = await axios.post('api/users/login', user);
            console.log("Login response: ", response.data);
            toast.success("successful...");
            router.push('/profile')
            
            
        } catch (error:any) {
            console.log("login: ", error);
            toast.error(error.message);
            setLoading(false);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        if( user.email.length > 0  && 
            user.password.length > 0 ){
                setButtonDisabled(false);
        }else {
            setButtonDisabled(true);
        }
    }, [user])

    return (
        <div className="flex justify-around items-center h-full">
            <div className="flex flex-col w-[400px] h-auto bg-white text-black rounded-lg p-4  ">
                
                <div className="" >
                    <h1 className="font-bold text-center mb-3">Login</h1>

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
                            onClick={onLogin} 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer h-[50px] mb-3"    
                        >{loading?  <Ticker />: "Login"}</button>
                        <Link href="/signup">Sign Up</Link>
                        <Link href="/forgotpassword">Forgot my password</Link>
                    </div>
                        

                </div>
            </div>
        </div>
    )
}