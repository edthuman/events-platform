import { Timestamp } from "@firebase/firestore";

export function getDate(datetime: Timestamp) {
    const fullDate = datetime.toDate().toDateString()
    return fullDate.slice(4, 10)
}

export function getTime(datetime: Timestamp) {
    const fullDate = datetime.toDate().toTimeString()
    return fullDate.slice(0, 5)
}