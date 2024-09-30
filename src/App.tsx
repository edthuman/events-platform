import { useState } from "react"
import "./App.css"
import Login from "./Login"
import UserContext from "../hooks/UserContext.ts"
import { User } from "../types.ts"

function App() {
    const [user, setUser] = useState<User>({ role: "guest", username: "guest" })

    return <UserContext.Provider value={user}>
        <Login setUser={setUser}/>
    </UserContext.Provider>
}

export default App
