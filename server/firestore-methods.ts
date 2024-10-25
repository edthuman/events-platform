import { addDoc, arrayUnion, collection, doc, Firestore, getDocs, query, Timestamp, updateDoc } from "@firebase/firestore";
import { getDoc } from "firebase/firestore";
import { BooleanStateSetter } from "../types";
import { Showing, SingleShowingResponse, UpdateResponse } from "./firestore-types"

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
        fetchedShowings.sort((a: Showing, b: Showing) => {
            const x = a.startDate.seconds
            const y = b.startDate.seconds
            if (x < y) return -1
            if (x > y) return 1
            return 0
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
            id: showingId,
            ...showingData
        }
    }
    catch (err){
        return { error: "Something went wrong whilst retrieving showing details" }
    }
}

export async function postShowing(database: Firestore, name: string, startDate: Timestamp, endDate: Timestamp, description: string, film: string, imdbId: string, poster: string, price: "any" | number) {
    try {
        const showingsCollection = collection(database, "showings")
    
        const response = await addDoc(showingsCollection, { name, startDate, endDate, description, film, imdbId, poster, attendees: [], price })

        if (!response.id) {
            return { error: "Event posting was unsuccessful"}
        }

        return { id: response.id, error: "" }
    }
    catch (err) {
        return { error: "Something went wrong whilst posting event" }
    }
}

export async function addAttendee(database: Firestore, username: string, showingId: string): Promise<UpdateResponse> {
    try {
        const addAttendeeInstruction = arrayUnion(username)

        const showingDocument = doc(database, `showings/${showingId}`)

        await updateDoc(showingDocument, { attendees: addAttendeeInstruction })
        // updateDoc returns undefined when successful, otherwise errors

        return { error: false }
    }
    catch (err) {
        return { error: true }
    }
}