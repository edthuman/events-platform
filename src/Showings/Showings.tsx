import { collection, getDocs, query } from "@firebase/firestore";
import { useContext, useEffect, useState } from "react";
import ShowingCard from "./ShowingCard";
import FirebaseContext from "../../hooks/FirebaseContext";
import { Showing } from "../../types";

function Showings() {
    const [showings, setShowings] = useState<Showing[]>([])
    const database = useContext(FirebaseContext)

    async function getDocuments(){
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