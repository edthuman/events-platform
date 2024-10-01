import { collection, getDocs, getFirestore, query } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { useEffect, useState } from "react";
import ShowingCard from "./ShowingCard";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
}

function Showings() {
    const [showings, setShowings] = useState<any[]>([])
    
    async function getDocuments(){
        const app = initializeApp(firebaseConfig)
        const db = getFirestore(app)

        const showingsRef = collection(db, "showings")
        
        const queryObject = query(showingsRef)
        const snapshot = await getDocs(queryObject)

        const fetchedShowings: any[] = []
        snapshot.forEach((document)=>{
            const showing = {
                id: document.id,
                ...document.data()
            }

            fetchedShowings.push(showing)
        })
        setShowings(fetchedShowings)
    }

    useEffect(()=>{
        getDocuments()
    }, [])
    
    return showings.length ? (
    <>
        <h1>Upcoming Showings</h1>
        {showings.map((showing)=> <ShowingCard showing={showing} key={showing.id}/>)}
    </>
    ) : (
    <>
        <h1>Loading showings...</h1>
    </>
    )
}

export default Showings