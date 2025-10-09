export default async function UserProfile({params}:any){

    const {id} = await params;

    return (
        <div>
        <h1>user profile</h1>
        <p>{id}</p>
        </div>

    )

}