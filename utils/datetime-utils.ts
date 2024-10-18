import { Timestamp } from "@firebase/firestore";

export function getDate(datetime: Timestamp) {
    const fullDate = datetime.toDate().toDateString()
    return fullDate.slice(4, 10)
}

export function getTime(datetime: Timestamp) {
    const fullDate = datetime.toDate().toTimeString()
    return fullDate.slice(0, 5)
}

export function formatToGoogleCalendarDate(dateTime: Timestamp) {
    const isoString = dateTime.toDate().toISOString()
    const nanosecondsRemoved = isoString.replace(/\.\d\d\d/, "")
    const punctuationRemoved = nanosecondsRemoved.replace(/[-:]/g, "")
    return punctuationRemoved
}