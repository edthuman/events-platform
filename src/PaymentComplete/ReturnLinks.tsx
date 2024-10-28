import { Link } from "react-router-dom";

function ReturnLinks({ showingId }:{ showingId: any }) {
    const linkStyling = "text-xl py-3 md:py-4 xl:py-5 w-9/12 sm:w-7/12 md:w-5/12 lg:w-4/12 border hover:text-grey"
    
    return <div className="flex flex-col gap-5 items-center mt-6">
    <Link className={linkStyling} to={`/showing/${showingId}`} target="_self">
        Return to showing page
    </Link>
    <Link className={linkStyling} to="/" target="_self">
        Return to home page
    </Link>
    </div>
}

export default ReturnLinks