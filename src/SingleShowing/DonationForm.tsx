import { useState } from "react"
import { StringStateSetter } from "../../types"
import { handlePriceInput } from "../event-handler"

function DonationForm({ donation, setDonation }: {donation: string, setDonation: StringStateSetter}) {
    const [error, setError] = useState("")

    return <>
        <form className="mt-4">
            <label htmlFor="price" className="mr-3">Donation (£):</label>
            <input id="price" className="w-2/6 text-black pl-1 pr-0.5" type="text" value={donation} placeholder="0" onChange={e => handlePriceInput(e, setDonation, setError)}/>
        </form>
        {error ? <p className="text-xl pt-3">{error}</p> : null}
    </>
}

export default DonationForm 