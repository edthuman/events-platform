import { Link } from "react-router-dom"

function LoggedOutPayAttempt() {
    return <>
    <h1 className="mt-8 mb-7 px-3 text-2xl">Must be logged in to pay for an event</h1>
    <Link to="/" target="_self" className="border px-4 py-2 hover:text-grey">Back to home page</Link>
</>
}

export default LoggedOutPayAttempt