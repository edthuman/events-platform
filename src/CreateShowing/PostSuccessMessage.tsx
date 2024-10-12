import { Link } from "react-router-dom"

function PostSuccessMessage({showingId}: {showingId: string}) {
    return <>
        <h2>Event Posted!</h2>
        <Link to={`/showing/${showingId}`} target="_self">See event page</Link>
    </>
}

export default PostSuccessMessage