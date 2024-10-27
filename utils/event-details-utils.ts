export function getDurationSeconds(duration: string) {
    const hours = Number(duration.slice(0,2))
    const mins = Number(duration.slice(3))
    const seconds = (hours * 3600) + (mins * 60)
    return seconds
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