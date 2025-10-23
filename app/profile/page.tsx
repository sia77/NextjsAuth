import Link from "next/link";
import { headers } from 'next/headers';
import { NextResponse } from "next/server";
import { json } from "stream/consumers";



export default async function ProfilePage(){

    const headersList = headers();
    const cookieHeader = (await headersList).get('cookie');
    const BASE_URL = process.env.DOMAIN;
    const fullPath = `${BASE_URL}/api/users/user`; 

    try {
               
        const res = await fetch(fullPath, { 
            headers: {                
                'Cookie': cookieHeader || '',
            },
            cache: "no-store",
        });

        if( !res.ok) throw new Error("Failed to fetch user details");
        const user = await res.json();               
        
        return (
            <div className="flex justify-around items-center h-full">
                <div className="flex flex-col w-[400px] h-auto bg-white text-black rounded-lg p-4">
                    <Link href = {
                        { 
                            pathname: `/profile/${user.data._id}`, 
                            query: { data: JSON.stringify( user.data )} 
                        }
                    }>Click here to get User profile details</Link>
                </div>
            </div>
        )

    } catch (error:unknown) {
        console.log("getUserDetails: ", error);

        return (
            <div className="flex justify-around items-center h-full">
                <div className="flex flex-col w-[400px] h-auto bg-white text-black rounded-lg p-4">
                    <div className="border px-4 py-3 rounded my-4 text-sm bg-red-100 border-red-400 text-red-700">
                        <p>Something went wrong loading your profile.</p>
                    </div>
                </div>
            </div>
        );

    }

}