import axios from "axios";
import Link from "next/link";
import { headers } from 'next/headers';

const getUserDetails = async (cookieHeader: string | null) => {

    const BASE_URL = process.env.DOMAIN;

    try {

        const fullPath = `${BASE_URL}/api/users/user`;        
        const res = await axios.get(fullPath, { 
            headers: {                
                'Cookie': cookieHeader || '',
            },
        });
        const userId = res.data.data._id;
        return userId;

    } catch (error) {
        console.log("getUserDetails: ", error);        
    }
}


export default async function ProfilePage(){

    const headersList = headers();
    const cookieHeader = (await headersList).get('cookie');
     const userId = await getUserDetails(cookieHeader);

    return (
        <div className="flex justify-around items-center h-full">
            <div className="flex flex-col w-[400px] h-auto bg-white text-black rounded-lg p-4">
                <Link href={`/profile/${userId}`}>Click here to get User profile details</Link>
            </div>
        </div>
    )
}