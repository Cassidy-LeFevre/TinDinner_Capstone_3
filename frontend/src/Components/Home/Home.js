import React from 'react'
import { useSelector } from "react-redux";import axios from 'axios'
import { baseUrl } from '../../Shared/baseUrl'
import isOpen from './isOpen';

export default function Home(props) {

    const loadedUser = useSelector(state => state.user)

    const [mode, setMode] = React.useState("home")

    const [zip, setZip] = React.useState("")
    const [city, setCity] = React.useState("")
    const [state, setState] = React.useState("")

    const [choices, setChoices] = React.useState([])
    const [selections, setSelections] = React.useState([])
    const [searchEmail, setSearchEmail] = React.useState("")
    const [invitation, setInvitation] = React.useState(
        {
            hostId: loadedUser.id, // current user's user id
            proposedRestaurants: [], // array of restaurant IDs - any thumbs-down will remove an ID from the invitation
            invitedGuests: [], // array of guests (ids) invited to this outing
            decisionDate: "" // expiration date
        }
    )

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
                if(response.data.length === 0) {
                    alert("The ZIP code entered was not found!!!")
                    return
                }
                setChoices(response.data)
                setMode("choices")
            })
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
                if(response.data.length === 0) {
                    alert("The location entered was not found!!!")
                    return
                }
                setChoices(response.data)
                setMode("choices")
            })
        }
        else alert("Please enter a ZIP Code or City and State to search!!!")
    }

    function isSelected(choiceId) {
        for(let i = 0; i < selections.length; i++) if(selections[i] == choiceId) return true
        return false
    }

    function addRestaurantToSelections(event) {
        const choiceId = event.target.id
        if(selections.length >= 5) {
            alert("You can only select up to five restaurants per invitation!!!")
            return
        }
        if(selections.length === 0) setSelections([choiceId])
        else {
            for(let i = 0; i < selections.length; i++) {
                if(selections[i] == choiceId) {
                    alert("This restaurant is already selected for this invitation!!!")
                    return
                }
                setSelections([...selections, choiceId])
            }
        }
    }

    function removeRestaurantFromSelections(event) {
        const removeId = event.target.id
        if(selections.length === 0) {
            alert("There are no restaurants selected!!!")
            return
        }
        let workingSelections = []
        for(let i = 0; i < selections.length; i++) {
            if(selections[i] != removeId) {
                workingSelections.push(selections[i])
            }
        }
        setSelections(workingSelections)
    }

    function generateInvitation() {
        setMode("invite")
    }

    // React.useEffect(() => {         // THIS IS ONLY HERE FOR TESTING
    //     console.log(selections)
    // }, [selections])

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
                            {!isSelected(choice.restaurantId) && <button id={choice.restaurantId} onClick={addRestaurantToSelections}>Add to invitation</button>}
                            {isSelected(choice.restaurantId) && <button id={choice.restaurantId} onClick={removeRestaurantFromSelections}>Remove from invitation</button>}
                            <hr/>
                        </li>
                    ))}
                </ul>
            )
        }
    }

    function listGuests() { // error happening here - nothing is displaying (could be nothing in the array)
        return (
            <ul>
                {invitation.invitedGuests.map((guest) => (
                    <li>
                        {findUsernameByUserId(guest)}
                        <button onClick={removeGuest(guest)}>Remove</button>
                    </li>
                ))}
            </ul>
        )
    }

    function addGuest(event) { // error happening here - invitation.inviitedGuests is not updating
        const guestId = findUserIdByUsername(event.target.id)
        console.log(invitation.invitedGuests)
        if(invitation.invitedGuests.length === 0) {
            setInvitation({...invitation, [invitation.invitedGuests]: guestId})
            return
        }
        let workingGuests = []
        workingGuests.push([invitation.invitedGuests])
        for(let i = 0; i < invitation.invitedGuests.length; i++) {
            if(invitation.invitedGuests[i] == guestId) {
                alert("You have already added this guest!!!")
                return
            }
        }
        workingGuests.push([guestId])
        setInvitation({...invitation, [invitation.invitedGuests]: workingGuests})
    }

    function removeGuest(guestId) { // Haven't reached this for testing yet
        let workingGuests = []
        for(let i = 0; i < invitation.invitedGuests.length; i++) if(invitation.invitedGuests[i] != guestId) workingGuests.push(invitation.invitedGuests[i])
        setInvitation({...invitation, invitedGuests: workingGuests})
    }

    function findUserIdByUsername(emailAddress) { // replace with fetch later
        // axios.get(baseUrl + "/users/" + emailAddress)
        // .then(function (response){
        //     console.log(response.data)
        // })
        return Math.floor(Math.random() * 100) + 5000
    }

    function findUsernameByUserId(userNumber) { // replace with fetch later
        // axios.get(baseUrl + "/users/" + emailAddress)
        // .then(function (response){
        //     console.log(response.data)
        // })
        return "test@this." + userNumber
    }

    function updateSearchEmail(event) {
        setSearchEmail(event.target.value)
    }

    function submitInvite(event) {
        event.preventDefault()
        //do other stuff
        //make sure to assign: invitation.proposedRestaurants = selections using setState()
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
                {selections.length > 0 && <button onClick={generateInvitation}>Create invitation with selected restaurants</button>}
                {showCandidates()}
            </div>}

            {mode==="invite" && <div>
                <h3>Invite Diners!</h3>
                <form onSubmit={submitInvite}>
                    <input type="email" placeholder="Add a guest (email)" value={searchEmail} onChange={updateSearchEmail}/>
                    <button type="button" id={searchEmail} onClick={addGuest}>Add</button>
                    {invitation.invitedGuests.length > 0 && listGuests()}
                    <hr/>
                    <input type="submit" value="Submit" />
                </form>
            </div>}

        </div>
    )
}