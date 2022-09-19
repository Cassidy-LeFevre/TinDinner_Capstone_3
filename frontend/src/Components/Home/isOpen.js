export default function isOpen(hoursList) {
    if(hoursList === "Open 24 hours") return true
    const today = new Date()
    const daysOfTheWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const day = daysOfTheWeek[today.getDay()];
    const hour = today.getHours();
    const minute = today.getMinutes();
    const hoursArray = hoursList.split(" \\ ")
    let isolatedHoursString = ""
    let dayBeforeString = ""
    for(let i = 0; i < hoursArray.length; i++) {
        if(day === hoursArray[i].split(" ")[0]) {
            isolatedHoursString = hoursArray[i].split(" ")[1]
            dayBeforeString = i === 0 ? hoursArray[6].split(" ")[1] : hoursArray[i - 1].split(" ")[1]
        }
    }
    if(isolatedHoursString === "Closed") return false
    const openingString = isolatedHoursString.split("–")[0]
    const closingString = isolatedHoursString.split("–")[1]
    const dayBeforeOpeningString = isolatedHoursString.split("–")[0]
    const dayBeforeClosingString = dayBeforeString.split("–")[1]
    let closingIsPm = true
    let dayBeforeClosingIsPm = true
    if(closingString === undefined || dayBeforeClosingString === undefined) {
        alert("There was a problem fetching open hours!!!  Check hours details for open hours.")
        return false
    }
    if(closingString.charAt(closingString.length - 2) === "A") closingIsPm = false
    if(dayBeforeClosingString.charAt(dayBeforeClosingString.length - 2) === "A") dayBeforeClosingIsPm = false
    let openingIsPm = openingString.includes("P") ? true : openingString.includes("A") ? false : closingIsPm ? true : false
    let dayBeforeOpeningIsPm = dayBeforeOpeningString.includes("P") ? true : dayBeforeOpeningString.includes("A") ? false : dayBeforeClosingIsPm ? true : false
    let openingHourString = "";
    let openingMinuteString = "";
    if(openingString === undefined || dayBeforeOpeningString === undefined) {
        alert("There was a problem fetching open hours!!!  Check hours details for open hours.")
        return false
    }
    for(let i = 0; i < openingString.length; i++) {
        if(isNaN(openingString.charAt(i))) {
            if(openingString.charAt(i) === ":") openingMinuteString = openingString.charAt(i + 1) + openingString.charAt(i + 2)
            else openingMinuteString = "0"
            i = openingString.length
        }
        openingHourString += openingString.charAt(i)
    }
    let dayBeforeOpeningHourString = "";
    for(let i = 0; i < dayBeforeOpeningString.length; i++) {
        if(isNaN(dayBeforeOpeningString.charAt(i))) i = dayBeforeOpeningString.length
        else dayBeforeOpeningHourString += openingString.charAt(i)
    }
    let closingHourString = ""
    let closingMinuteString = ""
    for(let i = 0; i < closingString.length; i++) {
        if(isNaN(closingString.charAt(i))) {
            if(closingString.charAt(i) === ":") closingMinuteString = closingString.charAt(i + 1) + closingString.charAt(i + 2)
            else closingMinuteString = "0"
            i = closingString.length
        }
        closingHourString += closingString.charAt(i)
    }
    let dayBeforeClosingHourString = ""
    let dayBeforeClosingMinuteString = ""
    for(let i = 0; i < dayBeforeClosingString.length; i++) {
        if(isNaN(dayBeforeClosingString.charAt(i))) {
            if(dayBeforeClosingString.charAt(i) === ":") dayBeforeClosingMinuteString = dayBeforeClosingString.charAt(i + 1) + dayBeforeClosingString.charAt(i + 2)
            else dayBeforeClosingMinuteString = "0"
            i = dayBeforeClosingString.length
        }
        dayBeforeClosingHourString += dayBeforeClosingString.charAt(i)
    }
    let openingHour = Number(openingHourString)
    if(openingIsPm) openingHour = Number(openingHourString) + 12
    if(openingHour % 12 === 0) openingHour -= 12
    const openingMinute = Number(openingMinuteString)
    let closingHour = Number(closingHourString)
    if(closingIsPm) closingHour = Number(closingHourString) + 12
    if(closingHour % 12 === 0) closingHour -= 12
    const closingMinute = Number(closingMinuteString)
    let dayBeforeOpeningHour = Number(dayBeforeOpeningHourString)
    if(dayBeforeOpeningIsPm) dayBeforeOpeningHour = Number(dayBeforeOpeningHourString) + 12
    if(dayBeforeOpeningHour % 12 === 0) dayBeforeOpeningHour -= 12
    let dayBeforeClosingHour = Number(dayBeforeClosingHourString)
    if(dayBeforeClosingIsPm) dayBeforeClosingHour = Number(dayBeforeClosingHourString) + 12
    if(dayBeforeClosingHour % 12 === 0) dayBeforeClosingHour -= 12
    const dayBeforeClosingMinute = Number(dayBeforeClosingMinuteString)
    const dayOverlap = openingHour > closingHour
    const dayBeforeOverlap = dayBeforeOpeningHour > dayBeforeClosingHour
    if(dayOverlap) {
        if(hour >= openingHour) {
            if(hour === openingHour) return minute >= openingMinute
            return true
        }
    }
    else if(dayBeforeOverlap) {
        if(hour <= dayBeforeClosingHour) {
            if(hour === dayBeforeClosingHour) return minute < dayBeforeClosingMinute
            return true
        }
    }
    else {
        if(hour === openingHour) return minute >= openingMinute
        if(hour === closingHour) return minute < closingMinute
        return hour > openingHour && hour < closingHour
    }
}