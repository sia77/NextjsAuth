"use client";

import { useSearchParams } from "next/navigation";

export default function UserProfile(){

    const searchParams = useSearchParams();
    const data = searchParams.get("data");
    const user = data ? JSON.parse(data) : null;

    return (
        <div className="flex justify-around items-center h-full">
            <div className="flex flex-col w-[450px] h-auto bg-white text-black rounded-lg p-4">
                <h1 className="font-bold text-center mb-3">user profile</h1>
                <div className="grid grid-cols-4">
                    <span className="col-span-1 text-gray-600">Id: </span>
                    <span className="col-span-3">{user._id}</span>
                    
                    <span className="col-span-1 text-gray-600">Username: </span>
                    <span className="col-span-3">{user.username}</span>                    

                    <span className="col-span-1 text-gray-600">Email: </span>
                    <span className="col-span-3">{user.email}</span>
                </div>
            </div>
        </div>
    )

}