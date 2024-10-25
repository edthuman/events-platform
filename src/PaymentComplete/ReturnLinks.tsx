import { Link } from "react-router-dom";

function ReturnLinks({ showingId }:{ showingId: string }) {
    const linkStyling = " text-xl py-3 w-3/4 border hover:text-grey"
    
    return <div className="flex flex-col gap-5 items-center mt-6">
    <Link className={linkStyling} to={`/showing/${showingId}`} target="_self">
        Return to showing page
    </Link>
    <Link className={linkStyling} to="/showings" target="_self">
        Return to home page
    </Link>
    </div>
}

export default ReturnLinks