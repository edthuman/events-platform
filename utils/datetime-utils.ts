import { Timestamp } from "@firebase/firestore";

export function getDate(datetime: Timestamp) {
    const fullDate = datetime.toDate().toDateString()
    return fullDate.slice(4, 10)
}

export function getFullDate(datetime: Timestamp) {
    const fullDate = datetime.toDate()
    const day = String(fullDate.getDate())
    const month = String(fullDate.getMonth() + 1)
    const year = String(fullDate.getFullYear())
    return `${year}-${month}-${day}`
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

export function getCurrentDate(): string {
    const date = new Date().toLocaleDateString()
    return date.slice(-4) + "-" + date.slice(3, 5) + "-" + date.slice(0, 2)
}

export function getDuration(start: Timestamp, end: Timestamp) {
    const durationMins = (end.seconds - start.seconds) / 60
    const mins = String(durationMins % 60)
    const hours = String(Math.floor(durationMins / 60))
    const duration = `${hours.length === 1 ? "0" : ""}${hours}:${mins.length === 1 ? "0" : ""}${mins}`
    return duration
}