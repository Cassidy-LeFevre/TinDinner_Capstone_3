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

    function getInvitation() {
        axios.get(baseUrl + "/request/" + props.invitationId)
        .then(function (response){
            setHost(response.data.creator.username)
            if(isExpired(response.data.decisionDateTime)) setExpired(true)
            setOptions(response.data.restaurantsByRequest)
        })
    }

    function discoverCandidates() {
        axios.get(baseUrl + "/restaurants-byId/" + props.invitationId)
        .then(function (response){
            console.log(response) // nothing in .data yet
            // if(response.data.restaurantsByRequest.length === 0) return
            // let buildChoices = []
            // for(let i = 0; i < response.data.restaurantsByRequest.length; i++) {
            //     response.data.restaurantsByRequest[i].voted = "none"
            //     buildChoices.push(response.data.restaurantsByRequest[i])
            // }
            // setChoices(buildChoices)
            // displayCandidates()
         })
    }

    function thumbsUp(event) {
        const choiceId = event.target.id
        //set choice.voted to "up"
    }

    function thumbsDown(event) {
        const choiceId = event.target.id
        //set choice.voted to "down"
    }

                    // function addRestaurantToSelections(event) { // REFERENCE FOR FUNCTION BEHAVIOR
                    //     const choiceId = event.target.id
                    //     if(selections.length >= 5) {
                    //         alert("You can only select up to five restaurants per invitation!!!")
                    //         return
                    //     }
                    //     if(selections.length === 0) setSelections([choiceId])
                    //     else {
                    //         for(let i = 0; i < selections.length; i++) {
                    //             if(selections[i] == choiceId) {
                    //                 alert("This restaurant is already selected for this invitation!!!")
                    //                 return
                    //             }
                    //             setSelections([...selections, choiceId])
                    //         }
                    //     }
                    // }
    
    function submitPreferences() {
        // iterate through choices.voted and delete all "down" entries
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
                        {choice.voted == "none" && <button className="guest--up" id={choice.restaurantId} onClick={thumbsUp}>Thumbs-Up!</button>}
                        {choice.voted == "none" && <button className="guest--down" id={choice.restaurantId} onClick={thumbsDown}>Thumbs-Down!</button>}
                        {choice.voted == "up" && <button className="guest--upselected" id={choice.restaurantId} onClick={thumbsUp}>Thumbs-Up!</button>}
                        {choice.voted == "up" && <button className="guest--downunselected" id={choice.restaurantId} onClick={thumbsDown}>Thumbs-Down!</button>}
                        {choice.voted == "down" && <button className="guest--upunselected" id={choice.restaurantId} onClick={thumbsUp}>Thumbs-Up!</button>}
                        {choice.voted == "down" && <button className="guest--downselected" id={choice.restaurantId} onClick={thumbsDown}>Thumbs-Down!</button>}
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
                        <h4 className="guest--candidates">{discoverCandidates()}</h4>
                        <button className="guest--submit" onClick={submitPreferences}>Submit Your Preferences</button>
                    </div>
                }
            </div>}
            {submitted && <h1 className="guest--submitted">Your preferences have been submitted!</h1>}
        </div>
    )
}