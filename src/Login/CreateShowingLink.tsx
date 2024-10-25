import { Link } from "react-router-dom"

function CreateShowingLink({linkStyling}: {linkStyling: string}) {
    return <Link to="/create-showing" className={linkStyling}>
        Create a showing
    </Link>
}

export default CreateShowingLink