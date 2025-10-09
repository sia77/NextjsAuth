import axios from "axios";
import Link from "next/link";
import { headers } from 'next/headers';

const getUserDetails = async (cookieHeader: string | null) => {

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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
        <Link href={`/profile/${userId}`}>User profile details</Link>
    )
}