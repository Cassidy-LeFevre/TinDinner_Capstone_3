package com.techelevator.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class RequestDTO {

    @JsonProperty("userId")
    long userId;

    @JsonProperty("restaurantIds")
    int[] restaurantIds;

    @JsonProperty("inviteeIds")
    long[] inviteeIds;

    @JsonProperty("decisionDateTime")
    String decisionDateTime;

    public long getUserId() {
        return userId;
    }

    public long[] getInviteeIds() {
        return inviteeIds;
    }

    public int[] getRestaurantIds() {
        return restaurantIds;
    }

    public String getDecisionDateTime() {
        return decisionDateTime;
    }

    public void setDecisionDateTime(String decisionDateTime) {
        this.decisionDateTime = decisionDateTime;
    }

    public void setInviteeIds(long[] inviteeIds) {
        this.inviteeIds = inviteeIds;
    }

    public void setRestaurantIds(int[] restaurantIds) {
        this.restaurantIds = restaurantIds;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }
}


