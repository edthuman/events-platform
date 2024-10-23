import { useContext, useEffect, useState } from "react";
import ShowingCard from "./ShowingCard";
import FirebaseContext from "../../hooks/FirebaseContext";
import { getAllShowings } from "../../server/firestore-methods";
import { Showing } from "../../server/firestore-types";
import Loading from "../Loading";

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
        <Loading />
    ) : showings.length === 0 ? (
        <div className="py-20">
            <p>Something went wrong whilst retrieving showings</p>
            <p className="pt-10">Please reload the page</p>
        </div>
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
