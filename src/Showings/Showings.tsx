import { useContext, useEffect, useState } from "react";
import ShowingCard from "./ShowingCard";
import FirebaseContext from "../../hooks/FirebaseContext";
import { getAllShowings } from "../../server/firestore-methods";
import { Showing } from "../../server/firestore-types";
import Loading from "../Loading";
import UserContext from "../../hooks/UserContext";

function Showings() {
    const [showings, setShowings] = useState<Showing[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const firestore = useContext(FirebaseContext);
    const { setUser } = useContext(UserContext)

    useEffect(() => {
        (async () => {
            const nonStaffUser = {
                role: "non-staff",
                username: "test"
            }
            setUser(nonStaffUser)

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
