import { createContext } from "react";
import { User } from "../types.ts"


const UserContext = createContext<User>({ role: "guest", username: "guest" })

export default UserContext