export function getCurrentDate() {
    const date = new Date().toLocaleDateString()
    return date.slice(-4) + "-" + date.slice(3, 5) + "-" + date.slice(0, 2)
}

export function getEventDetailsError(): string {
    return ""
}