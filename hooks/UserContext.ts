import { createContext } from "react";
import { User } from "../types.ts"
import { SetUser } from "../types.ts";

type UserContextObject = null | { user: User, setUser: SetUser }

const UserContext = createContext<UserContextObject>(null)

export default UserContext