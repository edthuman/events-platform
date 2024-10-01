import { useEffect } from "react"
import { useParams } from "react-router-dom"

function SingleShowing() {
    const showingId = useParams().showing_id

    useEffect(() => {
        
    }, [])

    return <>
        <h1>Hello from SingleShowing</h1>
        <p>Showing_id = {showingId}</p>
    </>
}

export default SingleShowing