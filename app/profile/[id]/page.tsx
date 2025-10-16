export default async function UserProfile({params}:any){

    const {id} = await params;

    return (
        <div className="flex justify-around items-center h-full">
            <div className="flex flex-col w-[400px] h-auto bg-white text-black rounded-lg p-4">
                <h1>user profile</h1>
                <p>{id}</p>
            </div>
        </div>
    )

}