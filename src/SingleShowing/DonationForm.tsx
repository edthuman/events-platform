import { useState } from "react";
import { StringStateSetter } from "../../types";
import { handlePriceInput } from "../event-handlers";

function DonationForm({
    donation,
    setDonation,
}: {
    donation: string;
    setDonation: StringStateSetter;
}) {
    const [error, setError] = useState("");

    return (
        <>
            <form className="mx-auto mt-4 w-full sm:w-10/12 md:w-8/12 lg:w-6/12">
                <label htmlFor="price" className="mr-3 text-lg lg:text-xl">
                    Donation (£):
                </label>
                <input
                    id="price"
                    className="w-2/6 text-black pl-1 pr-0.5 lg:text-lg"
                    type="text"
                    value={donation}
                    placeholder="0"
                    onChange={(e) => handlePriceInput(e, setDonation, setError)}
                />
            </form>
            {error ? <p className="text-xl xl:text-2xl pt-3">{error}</p> : null}
        </>
    );
}

export default DonationForm;
