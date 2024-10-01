import { getDocs, query } from "@firebase/firestore";
import { useContext, useEffect, useState } from "react";
import ShowingCard from "./ShowingCard";
import FirebaseContext from "../../hooks/FirebaseContext";

function Showings() {
    const [showings, setShowings] = useState<any[]>([])
    const database = useContext(FirebaseContext)

    async function getDocuments(){        
        const queryObject = query(database)
        const snapshot = await getDocs(queryObject)

        const fetchedShowings: any[] = []
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