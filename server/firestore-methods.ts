import { doc, Firestore } from "@firebase/firestore";
import { getDoc } from "firebase/firestore";

export async function getShowingDetails(database: Firestore, showingId: string | undefined) {
    const docRef = doc(database, `showings/${showingId}`);
    const snapshot = await getDoc(docRef);
    const showingData = snapshot.data();
    
    if (showingData === undefined) {
        return { error: "No showing exists for given ID" }
    }
    
    return {
        id: showingData.id,
        ...showingData
    }
}