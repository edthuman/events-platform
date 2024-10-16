import { useState } from "react"
import { StringStateSetter } from "../../types"
import { handlePriceInput } from "../event-handler"

function DonationForm({ donation, setDonation }: {donation: string, setDonation: StringStateSetter}) {
    const [error, setError] = useState("")

    return <>
        <form>
            <label htmlFor="price">Donation (£)</label>
            <input id="price" type="number" value={donation} placeholder="0" onChange={e => handlePriceInput(e, setDonation, setError)}/>
        </form>
        {error ? <p>{error}</p> : null}
    </>
}

export default DonationForm 