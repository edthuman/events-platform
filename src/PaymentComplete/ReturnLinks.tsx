import { Link, useSearchParams } from "react-router-dom";

function ReturnLinks() {
    const queries = useSearchParams()[0]
    const showingId = queries.get("showing")

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