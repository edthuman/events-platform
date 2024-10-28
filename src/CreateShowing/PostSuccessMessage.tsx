import { Link } from "react-router-dom"

function PostSuccessMessage({showingId}: {showingId: string}) {
    const linkTextStyle = "border w-max text-xl lg:text-2xl py-3 lg:py-4 px-4 lg:px-5 mb-5 mx-auto hover:text-grey"

    return <>
        <h1 className="text-3xl lg:text-4xl mt-8 mb-7 lg:mb-9">Event Posted!</h1>
        <Link to={`/showing/${showingId}`} target="_self">
        <p className={linkTextStyle}>See event page</p>
        </Link>
        <Link to="/" target="_self">
            <p className={linkTextStyle}>See home page</p>
        </Link>
    </>
}

export default PostSuccessMessage