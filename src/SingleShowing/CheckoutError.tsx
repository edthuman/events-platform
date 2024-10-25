import { Link } from "react-router-dom";

function CheckoutError() {
    return <>
        <h1 className="text-2xl mt-5 mb-8 px-2">Something went wrong whilst loading payment form</h1>
        <Link to="/" target="_self" className="border text-lg py-3 px-3 hover:text-grey">Return to home page</Link>
    </>
}

export default CheckoutError