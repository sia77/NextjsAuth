"use client"

import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Navigation(){

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
        <header>
            <nav className="flex justify-around">
                <div className="flex w-[50%] mt-[40px] mb-[40px] justify-between items-center">
                    <Link href="/profile">Profile</Link>
                    <button
                        onClick={logout} 
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">Logout</button>
                </div>            
            </nav>
        </header>

    )
}

