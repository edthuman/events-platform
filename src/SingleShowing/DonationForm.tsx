import { useState } from "react"
import { handleDonationInput } from "./event-handlers"
import { StringStateSetter } from "../../types"

function DonationForm({ donation, setDonation }: {donation: string, setDonation: StringStateSetter}) {
    const [error, setError] = useState("")

    return <>
        <form>
            <label htmlFor="price">Donation (£)</label>
            <input id="price" type="number" value={donation} placeholder="0" onChange={e => handleDonationInput(e, setDonation, setError)}/>
        </form>
        {error ? <p>{error}</p> : null}
    </>
}

export default DonationForm 