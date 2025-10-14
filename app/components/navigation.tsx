"use client"

import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navigation(){
    const [cookieValue, setCookieValue] = useState(false);
    const cookieName = "token";

    useEffect(() => {
        const cookies = document.cookie;
        const cookieArray = cookies.split('; ');
        const targetCookie = cookieArray.find(row => row.startsWith(`${cookieName}=`));
   
        if (targetCookie) {
            const value = targetCookie.split('=')[1];
            console.log("value: ", value);
            //setCookieValue(value);
        }
    }, [])

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

    const login = () => {
        router.push('./login')
    }



    return (
        <header>
            <nav className="flex justify-around">
                <div className="flex w-[50%] mt-[40px] mb-[40px] justify-between items-center">
                    {!cookieValue && <Link href="/profile">Profile</Link>}
                    {cookieValue && <button
                        onClick={logout} 
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">Logout</button>}
                    {!cookieValue && <button
                        onClick={login} 
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">Login</button>}
                </div>            
            </nav>
        </header>

    )
}

