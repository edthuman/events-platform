import { addDoc, collection, doc, Firestore, getDocs, query, Timestamp } from "@firebase/firestore";
import { getDoc } from "firebase/firestore";
import { BooleanStateSetter } from "../types";
import { Showing, SingleShowingResponse } from "./firestore-types"

export async function getAllShowings(database: Firestore, setIsLoading: BooleanStateSetter): Promise<Showing[]> {
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

export async function getSingleShowing(database: Firestore, showingId: string | undefined): Promise<SingleShowingResponse> {
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

export async function postShowing(database: Firestore, name: string, datetime: Timestamp, description: string, film: string, imdbId: string, poster: string) {
    try {
        const showingsCollection = collection(database, "showings")
    
        await addDoc(showingsCollection, { name, datetime, description, film, imdbId, poster, attendees: [] })

        return { error: "" }
    }
    catch (err) {
        return { error: "Something went wrong whilst posting event" }
    }
}