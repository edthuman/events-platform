import { useContext, useEffect, useState } from "react";
import ShowingCard from "./ShowingCard";
import FirebaseContext from "../../hooks/FirebaseContext";
import { getAllShowings } from "../../server/firestore-methods";
import { Showing } from "../../server/firestore-types";
import Loading from "../Loading";
import ShowingLoadFailed from "./ShowingLoadFailed";
import { Link } from "react-router-dom";
import ToTopButton from "../ToTopButton";

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
        <ShowingLoadFailed />
    ) : (
        <>
            <h1 className="text-3xl xl:text-4xl mt-7 pb-4 lg:pb-6">Upcoming Showings</h1>
            <div className="mt-3 mb-7 lg:mb-10">
                <Link to="/create-showing" target="_self" className="text-lg border p-3 lg:p-4 lg:text-xl hover:text-grey">Create a showing</Link>
            </div>
            <div className="flex flex-col items-center md:flex-row md:flex-wrap gap-7 lg:gap-6 justify-center w-full mb-8">
                {showings.map((showing) => (
                    <ShowingCard showing={showing} key={showing.id} />
                ))}
            </div>
            <ToTopButton />
        </>
    );
}

export default Showings;
