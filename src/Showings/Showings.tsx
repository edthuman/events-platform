import { useContext, useEffect, useState } from "react";
import ShowingCard from "./ShowingCard";
import FirebaseContext from "../../hooks/FirebaseContext";
import { getAllShowings } from "../../server/firestore-methods";
import { Showing } from "../../server/firestore-types";
import Loading from "../Loading";
import ShowingLoadFailed from "./ShowingLoadFailed";
import { Link } from "react-router-dom";
import UserContext from "../../hooks/UserContext";
import ToTopButton from "../ToTopButton";

function Showings() {
    const [showings, setShowings] = useState<Showing[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const firestore = useContext(FirebaseContext);
    const {user} = useContext(UserContext)
    const isStaff = user.email && user.role === "staff"

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
        <ShowingLoadFailed />
    ) : (
        <>
            <h1 className="text-3xl mt-7 pb-4">Upcoming Showings</h1>
            <div className="mt-3 mb-7">
                <Link to="/create-showing" target="_self" className="border p-2 hover:text-grey">Create a showing</Link>
            </div>
            <div className="flex flex-wrap justify-center mt-3">
                {showings.map((showing) => (
                    <ShowingCard showing={showing} key={showing.id} />
                ))}
            </div>
            <ToTopButton />
        </>
    );
}

export default Showings;
