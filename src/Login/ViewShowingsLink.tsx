import { Link } from "react-router-dom";

function ViewShowingsLink({linkStyling}: {linkStyling: string}) {
    return <Link to="/" className={linkStyling}>
        View showings
    </Link>
}

export default ViewShowingsLink