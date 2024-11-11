import { getDatabase, ref, get } from "firebase/database";
import { FirebaseApp } from "firebase/app";

export async function checkIsStaff(firebase: FirebaseApp, databaseURL: string, email: string) {
    try {
        const db = getDatabase(firebase, databaseURL);
        const snapshot = await get(ref(db, "/"));

        const staffUsers = snapshot.val()

        if (staffUsers.includes(email)) { 
            return { isInvalidEmail: false, error: "" }
        }

        return { isInvalidEmail: true, error: "" }
    }
    catch {
        return { error: "Something went wrong during login, please try again" }
    }
}