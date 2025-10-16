import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
//import { useRouter } from "next/navigation";
import { cookies } from 'next/headers';
import LogoutButton from "./logoutbutton";

export default async function Navigation(){
    const cookieName = "token";
    const tokenCookie = (await cookies()).get(cookieName);
    const authenticated = !!tokenCookie && tokenCookie.value.length > 0;
    console.log("authenticated: ", authenticated);


    return (
        <header>
            <nav className="flex justify-around">
                <div className="flex w-[50%] mt-[40px] mb-[40px] justify-between items-center">
                    { authenticated ? (
                        <><Link href="/profile">Profile</Link><LogoutButton /></>
                    )
                    :
                        (
                            <Link
                                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                                href="/login">Login</Link>
                            
                        )
                    }

                </div>            
            </nav>
        </header>

    )
}

