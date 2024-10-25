import { Link } from "react-router-dom"

function PostSuccessMessage({showingId}: {showingId: string}) {
    const linkStyle = "text-2xl border py-3 px-4 block w-3/6 mx-auto mb-5"
    return <>
        <h1 className="text-4xl mt-8 mb-7">Event Posted!</h1>
        <Link to={`/showing/${showingId}`} className={linkStyle} target="_self">See event page</Link>
        <Link to="/" className={linkStyle} target="_self">See home page</Link>
    </>
}

export default PostSuccessMessage