"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


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
        <div className="flex flex-col items-center justify-center min-h-screen py-2" >
            <h1>Login</h1>

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
                onClick={onLogin}
            >Login</button>
            <Link href="/signup">Sign Up</Link>
        </div>
    )
}