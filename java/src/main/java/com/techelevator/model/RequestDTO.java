package com.techelevator.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class RequestDTO {


    int requestId = 0;

    @JsonProperty("userId")
    long userId;

    @JsonProperty("restaurantIds")
    int[] restaurantIds;

//    @JsonProperty("inviteeIds")
//    long[] inviteeIds;

    @JsonProperty("inviteeEmails")
    String[] inviteeEmails;

    @JsonProperty("decisionDateTime")
    String decisionDateTime;

    public int getRequestId() {
        return requestId;
    }

    public void setRequestId(int requestId) {
        this.requestId = requestId;
    }

    public String[] getInviteeEmails() {
        return inviteeEmails;
    }

    public void setInviteeEmails(String[] inviteeEmails) {
        this.inviteeEmails = inviteeEmails;
    }



    public long getUserId() {
        return userId;
    }

//    public long[] getInviteeIds() {
//        return inviteeIds;
//    }

    public int[] getRestaurantIds() {
        return restaurantIds;
    }

    public String getDecisionDateTime() {
        return decisionDateTime;
    }

    public void setDecisionDateTime(String decisionDateTime) {
        this.decisionDateTime = decisionDateTime;
    }

//    public void setInviteeIds(long[] inviteeIds) {
//        this.inviteeIds = inviteeIds;
//    }

    public void setRestaurantIds(int[] restaurantIds) {
        this.restaurantIds = restaurantIds;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }
}


