import React from 'react'
import { useSelector } from "react-redux";
import axios from 'axios'
import { baseUrl } from '../../Shared/baseUrl'
import isOpen from './isOpen';
import isExpired from './isExpired';
import beautifyDate from './beautifyDate';

export default function Home(props) {

    const loadedUser = useSelector(state => state.user)

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

    function clearState() {
        setZip("")
        setCity("")
        setState("")
        setChoices([])
        setSelections([])
        setSearchEmail("")
        setInvitedGuests([])
        setDecisionDate("")
        setInvitationId("")
        setPending([])
        setExpired([])
    }

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
        }
    }

    function removeGuest(guestName) {
        let workingGuests = []
        for(let i = 0; i < invitedGuests.length; i++) if(invitedGuests[i] != guestName) workingGuests.push(invitedGuests[i])
        setInvitedGuests(workingGuests)
    }

    function updateSearchEmail(event) {
        setSearchEmail(event.target.value)
    }

    function updateDate(event) {
        setDecisionDate(event.target.value)
    }

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

    function reviewRequests() {
        setMode("review")
        getRequests()
    }

    function getRequests() { // Finished once the DB returns usernames in the request
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

    function displayInvitedGuests(req) {
        return (
            <div>
                <h4 className="invitedguests--title">Guests Invited</h4>
                <ul>
                    {req.invitedUsers.length === 0 && <p className="invitedguests--noguests">There are no guests to display.</p>}
                    {req.invitedUsers.map((invGuest) => (
                        <li className="invitedguests--name">{invGuest}</li>
                    ))}
                </ul>
            </div>
        )
    }

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
                                    <button className="choices--call">Call to order</button>
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

    function returnHome() {
        setMode("home")
    }

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