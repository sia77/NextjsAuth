export default function Footer(){

    const theYear = () => {

        const now = new Date();
        return now.getFullYear();
    }

    return (
        <footer className="flex justify-center">
            <div className="text-[13px]">{theYear()}&copy;</div>
        </footer>
        
    )

}