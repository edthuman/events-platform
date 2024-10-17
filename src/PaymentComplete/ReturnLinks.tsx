import { Link } from "react-router-dom";

function ReturnLinks({ showingId }:{ showingId: string }) {
    return <>
    <Link to={`/showing/${showingId}`} target="_self">
        Return to showing page
    </Link>
    <Link to="/showings" target="_self">
        Return to home page
    </Link>
    </>
}

export default ReturnLinks