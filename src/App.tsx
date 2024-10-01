import { useState } from "react"
import "./App.css"
import Login from "./Login"
import UserContext from "../hooks/UserContext.ts"
import { User } from "../types.ts"
import Showings from "./Showings.tsx"

function App() {
    const [user, setUser] = useState<User>({ role: "guest", username: "guest" })

    return <UserContext.Provider value={user}>
        { user.role === "guest" ? <Login setUser={setUser}/> : <Showings /> }
    </UserContext.Provider>
}

export default App
