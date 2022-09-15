import React from "react";
import axios from 'axios'
import { baseUrl } from '../../Shared/baseUrl'
import isExpired from '../Home/isExpired';
import isOpen from "../Home/isOpen";

export default function Guest(props) {

    const [host, setHost] = React.useState("")
    const [options, setOptions] = React.useState([])
    const [expired, setExpired] = React.useState(false)
    const [choices, setChoices] = React.useState([])
    const [submitted, setSubmitted] = React.useState(false)

    React.useEffect(() => {
        getInvitation()
    }, [])

    React.useEffect(() => {
        discoverCandidates()
    }, [options])

    React.useEffect(() => {
        displayCandidates()
    }, [choices])
    

    function getInvitation() {
        axios.get(baseUrl + "/request/" + props.invitationId)
        .then(function (response){
            setHost(response.data.creator.username)
            if(isExpired(response.data.decisionDateTime)) setExpired(true)
            setOptions(response.data.restaurantsByRequest)
        })
    }

    function discoverCandidates() {
        if(options.length === 0) return
        let buildChoices = []
        for(let i = 0; i < options.length; i++) {
            options[i].voted = "none"
            buildChoices.push(options[i])
            setChoices(buildChoices)
        }
    }

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
    
    function submitPreferences() {
        console.log(choices)
        for(let i = 0; i < choices.length; i++) {
            if(choices[i].voted === "down") {
                // axios.delete(baseUrl + "/delete/" + choices[i].restaurantId + props.invitationId) //adjust this after endpoint is settled
                // .then(function (response){
                //     // catch errors, etc.
                // })
            }
        }
        setSubmitted(true)
    }

    function displayCandidates() {
        return (
            <ul className="guest--list">
                {choices.map((choice) => (
                    <li className="guest--listitem" id={choice.restaurantId} choiceZip={choice.zipCode}>
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
                        <br/>
                        <div className="guest--radio" onChange={handleRadio}>
                            <input className="guest--up" type="radio" value="thumbs-up" name="vote" id={choice.restaurantId} />Thumbs-up!
                            <input className="guest--down" type="radio" value="thumbs-down" name="vote" id={choice.restaurantId} />Thumbs-down!
                        </div>
                    </li>
                ))}
            </ul>
        )

    }

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