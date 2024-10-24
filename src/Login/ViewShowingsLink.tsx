import { Link } from "react-router-dom";

function ViewShowingsLink({linkStyling}: {linkStyling: string}) {
    return <Link to="/showings" className={linkStyling}>
        View showings
    </Link>
}

export default ViewShowingsLink