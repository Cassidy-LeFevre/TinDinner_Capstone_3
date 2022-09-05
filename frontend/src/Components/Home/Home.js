import React from 'react'
import { useSelector } from "react-redux";

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
            //if no match found alert and return else...
            setMode("choices")
        }
        else if(city !== "" && state !== "") {
            if(state.length > 2) {
                alert("State must be entered in the form of a 2-letter abbreviation!!!")
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