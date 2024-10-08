import { Link } from "react-router-dom"

function PostingSuccessMessage({showingId}: {showingId: string}) {
    return <>
        <h1>Event Posted!</h1>
        <Link to={`showing/${showingId}`} target="_self">See event page</Link>
    </>
}

export default PostingSuccessMessage