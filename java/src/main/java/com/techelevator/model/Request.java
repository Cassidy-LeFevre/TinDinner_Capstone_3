package com.techelevator.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.util.Set;

@Entity
@Table(name="request")
public class Request {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    int requestId;

    /*
    FOR SAKE OF EASE, I did not convert over to participant for this, because
    those who create requests must be users.
     */
    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id",nullable = false)
    @JsonManagedReference
    User creator;

    @ManyToMany(fetch = FetchType.EAGER)
    @JsonManagedReference
    @JoinTable(
            name = "participant_request",
            joinColumns = @JoinColumn(name = "request_id"),
            inverseJoinColumns = @JoinColumn(name = "participantId"))
    Set<Participant> invitedParticipants;


    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name= "request_restaurant",
            joinColumns = @JoinColumn(name = "request_id"),
            inverseJoinColumns = @JoinColumn(name ="restaurant_id")
    )
    @JsonManagedReference
    Set<Restaurant> restaurantsByRequest;

    Timestamp decisionDateTime;

    public Request(){};

    public Request(User creator, Set<Participant> invitedParticipants, Set<Restaurant> restaurantsByRequest, Timestamp decisionDateTime) {
        this.creator = creator;
        this.invitedParticipants = invitedParticipants;
        this.restaurantsByRequest = restaurantsByRequest;
        this.decisionDateTime = decisionDateTime;
    }

    public int getRequestId() {
        return requestId;
    }

    public void setRequestId(int requestId) {
        this.requestId = requestId;
    }

    public Timestamp getDecisionDateTime() {
        return decisionDateTime;
    }


    public void setDecisionDate(Timestamp decisionDateTime) {
        this.decisionDateTime = decisionDateTime;
    }

}
