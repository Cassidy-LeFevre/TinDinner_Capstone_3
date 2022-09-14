export default function beautifyDate(date) {

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const year = date.substring(0, 4)
    const month = date.substring(5, 7)
    const day = date.substring(8, 10)
    const hour = date.substring(11, 13)
    const minute = date.substring(14, 16)
    let meridium = "AM"

    const betterMonth = months[month - 1]
    if(hour > 11) meridium = "PM"
    let betterHour = hour
    if(meridium === "PM") betterHour -= 12
    if(hour == 0) {
        betterHour = "12"
        meridium = "AM"
    }
    if(hour == 12) {
        betterHour = "12"
        meridium = "PM"
    }
    if(betterHour.toString().substring(0, 1) == 0) betterHour = betterHour.toString().substring(1)

    return betterMonth + " " + day + ", " + year + " @ " + betterHour + ":" + minute + " " + meridium
}