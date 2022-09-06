import React from 'react'
import { useSelector } from "react-redux";import axios from 'axios'
import { baseUrl } from '../../Shared/baseUrl'

export default function Home(props) {

    const loadedUser = useSelector(state => state.user)
    //use loadedUser.id to identify current user
    console.log("User ID: " + loadedUser.id)

    const [mode, setMode] = React.useState("home")

    const [zip, setZip] = React.useState("")
    const [city, setCity] = React.useState("")
    const [state, setState] = React.useState("")

    const [choices, setChoices] = React.useState([])

    function getLocation() {
        setMode("locate")
    }

    function enterZip(event) {
        setZip(event.target.value)
    }
    function enterCity(event) {
        setCity(event.target.value)
    }
    function enterState(event) {
        setState(event.target.value)
    }

    function submitLocation(event) {
        event.preventDefault()
        if(zip !== "") {
            if(zip.length !== 5 || isNaN(zip)) {
                alert("ZIP Code must be a 5-digit number!!!")
                return
            }
            axios.get(baseUrl + "/restaurants/" + zip)
            .then(function (response){
                setChoices(response.data)
                setMode("choices") // Why is this running on an invalid response?
            })
            .catch(alert("The ZIP code entered was not found!!!")) // Why is this running on a valid response?
        }
        else if(city !== "" && state !== "") {
            const stateAbbreviations = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY']
            if(!stateAbbreviations.includes(state)) {
                alert("A valid two-letter state abbreviation must be entered!!!")
                return
            }
            const escapedCity = city.replace(" ", "_")
            axios.get(baseUrl + "/restaurants/by-city", {params: {stateCity: state + "_" + escapedCity}})
            .then(function (response){
                setChoices(response.data)
                setMode("choices") // Why is this running on an invalid response?
            })
            .catch(alert("The location entered was not found!!!")) // Why is this running on a valid response?
        }
        else alert("Please enter a ZIP Code or City and State to search!!!")
    }

    function isOpen(hoursList) {
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
        const openingString = isolatedHoursString.split("–")[0]
        const closingString = isolatedHoursString.split("–")[1]
        const dayBeforeOpeningString = isolatedHoursString.split("–")[0]
        const dayBeforeClosingString = dayBeforeString.split("–")[1]
        let closingIsPm = true
        let dayBeforeClosingIsPm = true
        if(closingString.charAt(closingString.length - 2) === "A") closingIsPm = false
        if(dayBeforeClosingString.charAt(dayBeforeClosingString.length - 2) === "A") dayBeforeClosingIsPm = false
        let openingIsPm = openingString.includes("P") ? true : openingString.includes("A") ? false : closingIsPm ? true : false
        let dayBeforeOpeningIsPm = dayBeforeOpeningString.includes("P") ? true : dayBeforeOpeningString.includes("A") ? false : dayBeforeClosingIsPm ? true : false
        let openingHourString = "";
        let openingMinuteString = "";
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

    function showCandidates() {
        if((zip !== "")||(city !== "" && state !== "")) {
            return (
                <ul>
                    {choices.map((choice) => (
                        <li id={choice.restaurantId} choiceZip={choice.zipCode}>
                            <h3>{choice.restaurantName}</h3>
                            {choice.thumbnailUrl && <img src={choice.thumbnailUrl} Alt="Restaurant view"/>}
                            <h4>{choice.address}</h4>
                            {isOpen(choice.hours) && <h4>Open now</h4>}
                            {!isOpen(choice.hours) && <h4>Closed</h4>}
                            <p>{choice.hours}</p>
                            {choice.phoneNumber &&
                                <>
                                    <h3>{choice.phoneNumber}</h3>
                                    <button>Call to order</button>
                                </>
                            }
                            <h4>{choice.type}</h4>
                            <hr/>
                        </li>
                    ))}
                </ul>
            )
        }
    }

    return(
        <div>

            {mode==="home" && <div>
                <button onClick={getLocation}>Send request to go out</button>
                <button>Review requests</button>
            </div>}

            {mode==="locate" && <div>
                <form onSubmit={submitLocation}>
                    <input type="textbox" placeholder="Enter ZIP Code" value={zip} onChange={enterZip} />
                    <h4>-OR-</h4>
                    <input type="textbox" placeholder="City" value={city} onChange={enterCity} />
                    <input type="textbox" placeholder="State" value={state} onChange={enterState} />
                    <input type="submit" value="Submit" />
                </form>
            </div>}

            {mode==="choices" && <div>
                {showCandidates()}
            </div>}

        </div>
    )
}