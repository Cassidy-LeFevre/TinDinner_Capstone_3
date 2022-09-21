import React from "react";
import axios from 'axios'
import { baseUrl } from '../../Shared/baseUrl'
import isExpired from '../Home/isExpired';
import isOpen from "../Home/isOpen";

export default function Guest(props) {

    // Establish state variables for storing state data
    const [requestId, setRequestId] = React.useState(0)
    const [host, setHost] = React.useState("")
    const [hostId, setHostId] = React.useState(0)
    const [options, setOptions] = React.useState([])
    const [expiration, setExpiration] = React.useState("")
    const [expired, setExpired] = React.useState(false)
    const [choices, setChoices] = React.useState([])
    const [submitted, setSubmitted] = React.useState(false)
    const [guests, setGuests] = React.useState([])

    // Use Effect hooks for page-refreshes
    React.useEffect(() => {
        getInvitation()
    }, [])

    React.useEffect(() => {
        discoverCandidates()
    }, [options])

    React.useEffect(() => {
        displayCandidates()
    }, [choices])
    
    // Read invitation data from the DB and assign elements to state variables for later use
    function getInvitation() {
        axios.get(baseUrl + "/request/" + props.invitationId)
        .then(function (response){
            setHost(response.data.creator.username)
            setHostId(response.data.creator.id)
            if(isExpired(response.data.decisionDateTime)) setExpired(true)
            setOptions(response.data.restaurantsByRequest)
            setGuests(response.data.invitedParticipants)
            setExpiration(response.data.decisionDateTime)
            setRequestId(response.data.requestId)
        })
    }

    // Build choices to display and initialize a new "voted" property for each one
    function discoverCandidates() {
        if(options.length === 0) return
        let buildChoices = []
        for(let i = 0; i < options.length; i++) {
            options[i].voted = "none"
            buildChoices.push(options[i])
            setChoices(buildChoices)
        }
    }

    // Switch radio button selections for voting feature
    function handleRadio(event) {
        let choiceList = choices
        for(let i = 0; i < choiceList.length; i++) {
            if(choiceList[i].restaurantId == event.target.id) {
                if(event.target.value == "thumbs-up") choiceList[i].voted = "up"
                if(event.target.value == "thumbs-down") choiceList[i].voted = "down"
            }
        }
        setChoices(choiceList)
    }
    
    // Store voting data to the DB and save only entries without a thumbs-down vote
    function submitPreferences() {
        let keepers = []
        let invitees = []
        for(let i = 0; i < choices.length; i++) if(choices[i].voted !== "down") keepers.push(choices[i].restaurantId)
        for(let i = 0; i < guests.length; i++) invitees.push(guests[i].username)
        const unformattedExpiry = expiration
        const spacedExpiry = unformattedExpiry.replace("T", " ")
        const expiry = spacedExpiry.substring(0, 19)
        const dataObject = {
            requestId: requestId,
            userId: hostId,
            inviteeEmails: invitees,
            restaurantIds: keepers,
            decisionDateTime: expiry
        }
        axios.put(baseUrl + '/request/update', dataObject)
        .then(function (response){
            if(response.data.length === 0) {
                alert("There was a problem while saving the invitation!!!")
                return
            }
            setSubmitted(true)
        })
    }

    // Open a Google Maps window with restaurant address
    function mapAddress(event) {
        window.open("http://maps.google.com/maps?q=" + event.target.id)
    }

    // Render all restaurant choices to the DOM
    function displayCandidates() {
        return (
            <ul className="guest--list">
                {choices.map((choice) => (
                    <li className="guest--listitem" id={choice.restaurantId} choiceZip={choice.zipCode}>
                        <h3 className="choices--name">{choice.restaurantName}</h3>
                        {choice.thumbnailUrl && <img  className="choices--image" src={choice.thumbnailUrl} Alt="Restaurant view"/>}
                        <h4 className="choices--address">{choice.address}</h4>
                        <button className="choices--map" id={choice.address} onClick={mapAddress}>View on Google Maps</button>
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
                        <br/>
                        <div className="guest--radio" onChange={handleRadio}>
                            <input className="guest--up" type="radio" value="thumbs-up" name={choice.restaurantId} id={choice.restaurantId} />👍
                            <input className="guest--down" type="radio" value="thumbs-down" name={choice.restaurantId} id={choice.restaurantId} />👎
                        </div>
                    </li>
                ))}
            </ul>
        )

    }

    // Main DOM rendering block with conditional elements
    return (
        <div className="guest--container">
            {!submitted && <div>
                <h3 className="guest--creator">Invitation created by</h3>
                <h3 className="guest--host">{host}</h3>
                <hr/>
                {expired && <h3 className="guest--expired">This invitation has expired</h3>}
                {!expired &&
                    <div className="guest--unexpiredcontainer">
                        <h3 className="guest--title">Restaurant Options</h3>
                        {choices.length > 0 && <div className="guest--candidates">{displayCandidates()}</div>}
                        {choices.length === 0 && <div className="guest--empty">There are no restaurants to display</div>}
                        <button className="guest--submit" onClick={submitPreferences}>Submit Your Preferences</button>
                    </div>
                }
            </div>}
            {submitted && <h1 className="guest--submitted">Your preferences have been submitted!</h1>}
        </div>
    )
}