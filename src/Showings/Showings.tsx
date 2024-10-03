import { useContext, useEffect, useState } from "react";
import ShowingCard from "./ShowingCard";
import FirebaseContext from "../../hooks/FirebaseContext";
import { Showing } from "../../types";
import { getAllShowings } from "../../server/firestore-methods";

function Showings() {
    const [showings, setShowings] = useState<Showing[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const firestore = useContext(FirebaseContext);

    useEffect(() => {
        (async () => {
            const fetchedShowings = await getAllShowings(
                firestore,
                setIsLoading
            );
            setShowings(fetchedShowings);
        })();
    }, []);

    return isLoading ? (
        <>
            <h1>Loading showings...</h1>
        </>
    ) : showings.length === 0 ? (
        <>
            <h1>Something went wrong whilst retrieving showings</h1>
        </>
    ) : (
        <>
            <h1>Upcoming Showings</h1>
            {showings.map((showing) => (
                <ShowingCard showing={showing} key={showing.id} />
            ))}
        </>
    );
}

export default Showings;
