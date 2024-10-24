import { Link } from "react-router-dom"

function LogInButton() {
    return <Link to="/login" className="flex items-start justify-center w-2/12 mt-1 mr-2">
        <p className="text-xl font-medium text-blue bg-[#8ec584] hover:bg-[#74a06c] p-2 rounded-xl">Login</p>
    </Link>
}

export default LogInButton