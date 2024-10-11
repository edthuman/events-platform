export function getEmailError(email: string): string {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (!emailRegex.test(email)) {
        return "Must give a valid email"
    }
    return ""
}

export function getPasswordError(password: string): string {
    if (password.length < 6) {
        return "Password must be longer than six characters"
    }
    if (password.length > 30) {
        return "Password must be 30 characters or fewer"
    }
    return ""
}