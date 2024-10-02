import { doc, Firestore } from "@firebase/firestore";
import { getDoc } from "firebase/firestore";

export async function getShowingDetails(database: Firestore, showingId: string | undefined) {
    if (showingId === undefined) {
        return { error: "No showing ID given" }
    }
    
    const docRef = doc(database, `showings/${showingId}`);

    try {
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
    catch (err){
        return { error: "Something went wrong whilst retrieving showing details" }
    }
}