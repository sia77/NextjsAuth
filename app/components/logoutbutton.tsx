"use client"

import axios from "axios";

import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function LogoutButton(){
    const router = useRouter();
    const { setAuthenticated } = useAuth();

    const logout = async() => {

        try {
            await axios.get('/api/users/logout');            
            router.push('/login');
            
        } catch (error:unknown) {
            console.log("Logout:", error);
        }finally{
            setAuthenticated(false);
        }
    }

    return (
        <button
            onClick={logout} 
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer">Logout</button>
    )
}