import React from 'react'
import { useSelector } from "react-redux";
import axios from 'axios'
import { baseUrl } from '../../Shared/baseUrl'
import isOpen from './isOpen';
import isExpired from './isExpired';
import beautifyDate from './beautifyDate';

export default function Home() {

    // Assign user from Redux state
    const loadedUser = useSelector(state => state.user)

    // Establish state variables to hold page data
    const [mode, setMode] = React.useState("home")

    const [zip, setZip] = React.useState("")
    const [city, setCity] = React.useState("")
    const [state, setState] = React.useState("")

    const [choices, setChoices] = React.useState([])
    const [selections, setSelections] = React.useState([])

    const [searchEmail, setSearchEmail] = React.useState("")
    const [invitedGuests, setInvitedGuests] = React.useState([])
    const [decisionDate, setDecisionDate] = React.useState("")

    const [invitationId, setInvitationId] = React.useState("")
    const [pending, setPending] = React.useState([])
    const [expired, setExpired] = React.useState([])

    // Functions that set state
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

    function clearEmail() {
        setSearchEmail("")
    }

    function updateSearchEmail(event) {
        setSearchEmail(event.target.value)
    }

    function updateDate(event) {
        setDecisionDate(event.target.value)
    }

    function returnHome() {
        setMode("home")
    }

    // Use effects to refresh page when state object updates
    React.useEffect(() => {
        refreshPage()
    }, [searchEmail])

    function refreshPage() {
        //refreshes the page
    }

    // Receive location filters and establish choices of restaurants to display based on results
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

    // Toggle selection of restaurants by host
    function isSelected(choiceId) {
        for(let i = 0; i < selections.length; i++) if(selections[i] == choiceId) return true
        return false
    }

    // Add selected restaurants to final selection array in state
    function addRestaurantToSelections(event) {
        const choiceId = event.target.id
        if(selections.length >= 5) {
            alert("You can only select up to five restaurants per invitation!!!")
            return
        }
        if(selections.length === 0) setSelections([Number(choiceId)])
        else {
            for(let i = 0; i < selections.length; i++) {
                if(selections[i] == choiceId) {
                    alert("This restaurant is already selected for this invitation!!!")
                    return
                }
                setSelections([...selections, Number(choiceId)])
            }
        }
    }

    // remove restaurants from selection list when unselected by the host
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

    // On finishing selections of restaurants display invitation screen to the host
    function generateInvitation() {
        setMode("invite")
    }

    // Render the selected restaurants to the DOM
    function showCandidates() {
        if((zip !== "")||(city !== "" && state !== "")) {
            return (
                <ul className="choices--list">
                    {choices.map((choice) => (
                        <li className="choices--listitem" id={choice.restaurantId} choiceZip={choice.zipCode}>
                            <h3 className="choices--name">{choice.restaurantName}</h3>
                            {choice.thumbnailUrl && <img  className="choices--image" src={choice.thumbnailUrl} Alt="Restaurant view"/>}
                            <h4 className="choices--address">{choice.address}</h4>
                            {isOpen(choice.hours) && <h4 className="choices--open">Open now</h4>}
                            {!isOpen(choice.hours) && <h4 className="choices--closed">Closed</h4>}
                            <p className="choices--hours">{choice.hours}</p>
                            {choice.phoneNumber &&
                                <>
                                    <h3 className="choices--phone">{choice.phoneNumber}</h3>
                                    <button className="choices--call">Call to order</button>
                                </>
                            }
                            <h4 className="choices--type">{choice.type}</h4>
                            {!isSelected(choice.restaurantId) && <button className="choices--add" id={choice.restaurantId} onClick={addRestaurantToSelections}>Add to invitation</button>}
                            {isSelected(choice.restaurantId) && <button className="choices--remove" id={choice.restaurantId} onClick={removeRestaurantFromSelections}>Remove from invitation</button>}
                        </li>
                    ))}
                </ul>
            )
        }
    }

    // Render the listed guests to the DOM
    function listGuests() {
        return (
            <ul className="invite--list">
                {invitedGuests.map((guest) => (
                    <li className="invite--listitem">
                        {guest}<button  className="invite--remove"onClick={() => removeGuest(guest)} >Remove</button>
                    </li>
                ))}
            </ul>
        )
    }

    // Add a guest to the list of selected invitees
    function addGuest(event) {
        const guestId = event.target.id
        if(invitedGuests.length === 0) setInvitedGuests([guestId])
        else {
            for(let i = 0; i < invitedGuests.length; i++) {
                if(invitedGuests[i] == guestId) {
                    alert("You have already added this guest!!!")
                    return
                }
            }
            setInvitedGuests([...invitedGuests, guestId])
            clearEmail()
        }
    }

    // Remove a guest from the list of selected invitees
    function removeGuest(guestName) {
        let workingGuests = []
        for(let i = 0; i < invitedGuests.length; i++) if(invitedGuests[i] != guestName) workingGuests.push(invitedGuests[i])
        setInvitedGuests(workingGuests)
    }

    // Save the invitation to the DB
    function submitInvite(event) {
        event.preventDefault()
        if(invitedGuests.length === 0) {
            alert("You need to invite at least one person to your outing!!!")
            return
        }
        if(decisionDate === "") {
            alert("You must select a deadline for responses!!!")
            return
        }
        const decisionDateTime = decisionDate.replace("T", " ") + ":00"
        const dataObject = {
            userId: loadedUser.id,
            restaurantIds: selections,
            inviteeEmails: invitedGuests,
            decisionDateTime: decisionDateTime
        }
        axios.post(baseUrl + '/send-request', dataObject)
        .then(function (response){
            if(response.data.length === 0) {
                alert("There was a problem while saving the invitation!!!")
                return
            }
            setInvitationId(response.data.requestId)
        })
        setMode("link")
    }

    // Display requests saved under the host's account
    function reviewRequests() {
        setMode("review")
        getRequests()
    }

    // Pull requests saved by the host from the DB and set state variables to store the results
    function getRequests() {
        axios.get(baseUrl + "/request-by-creator/" + loadedUser.id)
        .then(function (response){
            console.log(response)
            let pendingInvitations = [];
            let expiredInvitations = [];
            for(let i = 0; i < response.data.length; i++) {
                if(isExpired(response.data[i].decisionDateTime)) expiredInvitations.push(response.data[i])
                else pendingInvitations.push(response.data[i])
            }
            setPending(pendingInvitations)
            setExpired(expiredInvitations)
        })
    }

    // Render the list of requests save in the host's account to the DOM after sorting active and expired requests
    function listRequests() {
            return (
                <div className="finalist--container">
                    <hr/>
                    <h3 className="finalist--completed">Completed Requests</h3>
                    <ul className="finalist--completedlist">
                        {expired.map((inv) => (
                            <li className="finalist--completedlistitem">
                                <h4 className="finalist--expireddate">{beautifyDate(inv.decisionDateTime)}</h4>
                                {displayInvitedGuests(inv)}
                                {displayResults(inv)}
                            </li>
                        ))}
                    </ul>
                    <hr/>
                    <h3 className="finalist--pending">Pending Requests</h3>
                    <ul className="finalist--pendinglist">
                        {pending.map((inv) => (
                            <li className="finalist--pendinglistitem">
                                <h4 className="finalist--pendingdate">{beautifyDate(inv.decisionDateTime)}</h4>
                                {displayInvitedGuests(inv)}
                                {displayResults(inv)}
                            </li>
                        ))}
                    </ul>
                </div>
            )
    }

    // Render the list of guests saved in a request to the DOM
    function displayInvitedGuests(req) {
        console.log(req.invitedParticipants)
        return (
            <div>
                <h4 className="invitedguests--title">Guests Invited</h4>
                <ul>
                    {req.invitedParticipants.length === 0 && <p className="invitedguests--noguests">There are no guests to display.</p>}
                    {req.invitedParticipants.map((invGuest) => (
                        <li className="invitedguests--name">{invGuest.username}</li>
                    ))}
                </ul>
            </div>
        )
    }

    // Render the finalized requests to the DOM that have been pre-sorted by expiration status
    function displayResults(req) {
        return (
            <div>
                <h4 className="preferred--title">Restaurants Preferred</h4>
                <ul>
                    {req.restaurantsByRequest.length === 0 && <p className="preferred--none">There are no restaurants to display.</p>}
                    {req.restaurantsByRequest.map((finalist) => (
                        <li className="choices--listitem" id={finalist.restaurantId}>
                            <h3 className="choices--name">{finalist.restaurantName}</h3>
                            {finalist.thumbnailUrl && <img  className="choices--image" src={finalist.thumbnailUrl} Alt="Restaurant view"/>}
                            <h4 className="choices--address">{finalist.address}</h4>
                            {isOpen(finalist.hours) && <h4 className="choices--open">Open now</h4>}
                            {!isOpen(finalist.hours) && <h4 className="choices--closed">Closed</h4>}
                            <p className="choices--hours">{finalist.hours}</p>
                            {finalist.phoneNumber &&
                                <>
                                    <h3 className="choices--phone">{finalist.phoneNumber}</h3>
                                    <button className="choices--call" onclick="window.open('tel:900300400');">Call to order</button>
                                </>
                            }
                            <h4 className="choices--type">{finalist.type}</h4>
                        </li>
                    ))}
                    <hr/>
                </ul>
            </div>
        )
    }

    // Main DOM rendering block with conditional elements
    return(
        <div>

            {mode==="home" && <div className="home--container">
                <button onClick={getLocation} className="home--send">Send request to go out</button>
                <button onClick={reviewRequests} className="home--review">Review requests</button>
            </div>}

            {mode==="locate" && <div className="locate--container">
                <h3 className="locate--title" >Find restaurants</h3>
                <form className="locate--form" onSubmit={submitLocation}>
                    <input className="locate--zip" type="textbox" placeholder="Enter ZIP Code" value={zip} onChange={enterZip} />
                    <h4 className="locate--or">-OR-</h4>
                    <input className="locate--city" type="textbox" placeholder="City" value={city} onChange={enterCity} />
                    <input className="locate--state" type="textbox" placeholder="State (two-letter abbrev.)" value={state} onChange={enterState} />
                    <br/>
                    <input className="locate--submit" type="submit" value="Submit" />
                </form>
            </div>}

            {mode==="choices" && <div className="choices--container">
                {selections.length > 0 && <button className="choices--generate" onClick={generateInvitation}>Create invitation with selected restaurants</button>}
                {showCandidates()}
            </div>}

            {mode==="invite" && <div className="invite--container">
                <h3 className="invite--title">Invite Diners</h3>
                <form  className="invite--form" onSubmit={submitInvite}>
                    <input className="invite--email" type="email" placeholder="Add a guest (email)" value={searchEmail} onChange={updateSearchEmail}/>
                    <button className="invite--add" type="button" id={searchEmail} onClick={addGuest}>Add</button>
                    <br/>
                    {listGuests()}
                    <hr/>
                    <h4 className="invite--deadline">Choose a deadline for a decision</h4>
                    <input className="invite--date" type="datetime-local" id="decisiontime" name="decisiontime" onChange={updateDate}/>
                    <hr/>
                    <input className="invite--submit" type="submit" value="Submit" />
                </form>
            </div>}

            {mode==="link" && <div className="link--container">
                <h2 className="link--title">Invitation saved!  Here is the link your guests can visit to vote on your restaurant selections:</h2>
                <h3 className="link--link">{baseUrl + "/guest/" + invitationId}</h3>
            </div>}

            {mode==="review" && <div className="review--container">
                <h2 className="review--title">Your Requests</h2>
                <hr/>
                {listRequests()}
                <hr/>
                <button className="review--home" onClick={returnHome}>Done</button>
            </div>}

        </div>
    )
}