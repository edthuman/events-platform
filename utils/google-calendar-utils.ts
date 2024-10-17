import { Showing } from "../server/firestore-types"
import { formatToGoogleCalendarDate } from "./datetime-utils"

export function getEventLink(showing: Showing) {
    const {startDate, endDate, description, name, id} = showing
    const eventStart = formatToGoogleCalendarDate(startDate)
    const eventEnd = formatToGoogleCalendarDate(endDate)
    
    // "%0D" is a URL-encoded new line - equivalent to "\n"
    const details = description + "%0D%0D" + `Showing link: http://localhost:5173/showing/${id}`

    return `https://calendar.google.com/calendar/event?action=TEMPLATE&dates=${eventStart}/${eventEnd}&text=${name}&details=${details}&location=Community%20Cinema`
}