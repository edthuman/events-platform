import { useState } from "react"
import "./App.css"
import UserContext from "../hooks/UserContext.ts"
import FirebaseContext from "../hooks/FirebaseContext.ts"
import { User } from "../types.ts"
import AppRouter from "./AppRouter.tsx"
import { initializeApp } from "firebase/app"
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
}

function App() {
    const [user, setUser] = useState<User>({ role: "guest", email: "", isGoogleAccount: false })
    const firebaseApp = initializeApp(firebaseConfig)
    const firestore = getFirestore(firebaseApp)

    return user ? <UserContext.Provider value={{user, setUser}}>
        <FirebaseContext.Provider value={firestore}>
            <AppRouter/>
        </FirebaseContext.Provider>
    </UserContext.Provider> : null
}

export default App