export default function isExpired(exp) {
    const expirationDateString = exp
    const rightNow = new Date()
    const currentYear = rightNow.getFullYear()
    const thisMonth = rightNow.getMonth() + 1
    let currentMonth = ""
    if(thisMonth.length === 2) currentMonth = thisMonth
    else currentMonth = "0" + thisMonth
    const thisDay = rightNow.getDate()
    let currentDay = ""
    if(thisDay.length === 2) currentDay = thisDay
    else currentDay = "0" + thisDay
    const thisHour = rightNow.getHours() + 1
    let currentHour = ""
    if(thisHour.length === 2) currentHour = thisHour
    else currentHour = "0" + thisHour
    const thisMinute = rightNow.getMinutes() + 1
    let currentMinute = ""
    if(thisMinute.length === 2) currentMinute = thisMinute
    else currentMinute = "0" + thisMinute
    const thisSecond = rightNow.getSeconds() + 1
    let currentSecond = ""
    if(thisSecond.length === 2) currentSecond = thisSecond
    else currentSecond = "0" + thisSecond
    const expirationYear = expirationDateString.substring(0, 4)
    const expirationMonth = expirationDateString.substring(5, 7)
    const expirationDay = expirationDateString.substring(8, 10)
    const expirationHour = expirationDateString.substring(11, 13)
    const expirationMinute = expirationDateString.substring(14, 16)
    const expirationSecond = expirationDateString.substring(17, 19)
    if(Number(currentYear) < Number(expirationYear)) return false
    if(Number(currentYear) > Number(expirationYear)) return true
    if(Number(currentMonth) < Number(expirationMonth)) return false
    if(Number(currentMonth) > Number(expirationMonth)) return true
    if(Number(currentDay) < Number(expirationDay)) return false
    if(Number(currentDay) > Number(expirationDay)) return true
    if(Number(currentHour) < Number(expirationHour)) return false
    if(Number(currentHour) > Number(expirationHour)) return true
    if(Number(currentMinute) < Number(expirationMinute)) return false
    if(Number(currentMinute) > Number(expirationMinute)) return true
    if(Number(currentSecond) < Number(expirationSecond)) return false
    return true
}