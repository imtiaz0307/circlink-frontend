export const dateConversion = (date) => {
    const days = Math.abs((new Date().getTime() - new Date(date).getTime()) / 3600000 / 24)
    if (days < 1) {
        const hours = days * 24
        if (hours < 1) {
            const minutes = hours * 60
            if (minutes < 1) {
                return 'a few seconds'
            }
            else {
                return `${Math.round(minutes)} minutes`
            }
        }
        else {
            return `${Math.round(hours)} hours`
        }
    }
    else {
        return `${Math.round(days)} days`
    }
}