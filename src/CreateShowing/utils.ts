export function getCurrentDate(): string {
    const date = new Date().toLocaleDateString()
    return date.slice(-4) + "-" + date.slice(3, 5) + "-" + date.slice(0, 2)
}

export function getEventDetailsError(eventName: string, description: string): string {
    if (!eventName) {
        return "Must provide a name for your event"
    }
    if (!description) {
        return "Must provide a description for your event"
    }
    return ""
}