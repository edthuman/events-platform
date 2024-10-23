import { Link } from "react-router-dom"

function LogInButton() {
    return <Link to="/login" className="flex items-center justify-center w-2/12">
        <p className="text-xl font-medium text-[#242424] bg-[#8ec584] hover:bg-[#74a06c] p-2">Login</p>
    </Link>
}

export default LogInButton