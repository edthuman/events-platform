import { Link } from "react-router-dom"

function HomeLink() {
    return <Link to="/" className="block text-left hover:text-grey mt-2">
        {"←"}<span className="underline hover:no-underline">Back to all showings</span>
    </Link>
}

export default HomeLink