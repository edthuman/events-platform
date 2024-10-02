import { useContext, useEffect, useState } from "react";
import ShowingCard from "./ShowingCard";
import FirebaseContext from "../../hooks/FirebaseContext";
import { Showing } from "../../types";
import { getAllShowings } from "../../server/firestore-methods";

function Showings() {
    const [showings, setShowings] = useState<Showing[]>([])
    const firestore = useContext(FirebaseContext)

    useEffect(()=>{
        (async()=>{
            const fetchedShowings = await getAllShowings(firestore)
            setShowings(fetchedShowings)
        })()
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