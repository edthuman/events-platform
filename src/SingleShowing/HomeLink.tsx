import { Link } from "react-router-dom"

function HomeLink() {
    return <Link to="/" className="block text-left w-max hover:text-grey mt-2 xl:text-lg">
        {"←"}<span className="underline hover:no-underline">Back to all showings</span>
    </Link>
}

export default HomeLink