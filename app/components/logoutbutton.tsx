"use client"

import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LogoutButton(){
    const router = useRouter();

    const logout = async() => {

        try {
            const response = await axios.get('/api/users/logout');
            toast.success("Success");
            router.push('/login');
            
        } catch (error:any) {
            console.log("Logout:", error);
            toast.error(error.message)
        }
    }

    return (
        <button
            onClick={logout} 
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer">Logout</button>
    )
}