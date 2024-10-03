import { collection, doc, Firestore, getDocs, query } from "@firebase/firestore";
import { getDoc } from "firebase/firestore";
import { BooleanStateSetter, Showing } from "../types";

export async function getAllShowings(database: Firestore, setIsLoading: BooleanStateSetter) {
    try {
        const showingsCollection = collection(database, "showings")  
        const showingsQuery = query(showingsCollection)
        const snapshot = await getDocs(showingsQuery)
    
        const fetchedShowings: Showing[] = []
        snapshot.forEach((document: any)=>{
            const showing = {
                id: document.id,
                ...document.data()
            }
    
            fetchedShowings.push(showing)
        })
        setIsLoading(false)
        return fetchedShowings
    }
    catch (err) {
        setIsLoading(false)
        return []

    }
}

export async function getSingleShowing(database: Firestore, showingId: string | undefined) {
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