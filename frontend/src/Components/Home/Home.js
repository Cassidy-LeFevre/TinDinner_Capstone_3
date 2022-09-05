import React from 'react'
import { useSelector } from "react-redux";import axios from 'axios'
import { baseUrl } from '../../Shared/baseUrl'

export default function Home(props) {

    const loadedUser = useSelector(state => state.user)
    //use loadedUser.id to identify current user
    console.log(loadedUser.id)

    const [mode, setMode] = React.useState("home")

    const [zip, setZip] = React.useState("")
    const [city, setCity] = React.useState("")
    const [state, setState] = React.useState("")

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
            //load list of matches from endpoint
            const restaurantData = axios.post(baseUrl + "/restaurants/" + zip)
            .then(function (response){
                console.log(restaurantData)
                setMode("choices")
            })
            .catch(function (error){
                alert("The ZIP code entered was not found!!!")
            })
        }
        else if(city !== "" && state !== "") {
            const stateAbbreviations = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ]
            if(!stateAbbreviations.includes(state)) {
                alert("A valid two-letter state abbreviation must be entered!!!")
                return
            }
            //load list of matches from endpoint
            //if no match found alert and return else...
            setMode("choices")
        }
        else alert("Please enter a ZIP Code or City and State to search!!!")
    }

    function showCandidates() {
        if(zip !== "") {
            return (
                <h1>LIST OF RESTAURANTS TO CHOOSE FROM BY ZIP CODE</h1>
            )
        }
        else if(city !== "" && state !== "") {
            return (
                <h1>LIST OF RESTAURANTS TO CHOOSE FROM BY CITY AND STATE</h1>
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