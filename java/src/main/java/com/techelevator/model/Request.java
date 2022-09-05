package com.techelevator.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;

@Entity
public class Request {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    int requestId;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    User creator;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "request_user",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "request_id"))
    Set<User> invitedUsers;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name= "request_restaurant",
            joinColumns = @JoinColumn(name = "restaurant_id"),
            inverseJoinColumns = @JoinColumn(name ="request_id")
    )
    Set<Restaurant> restaurantsByRequest;

    @NotNull
    LocalDate decisionDate;

    @NotNull
    LocalTime decisionTime;

    public Request(){};

    public Request( LocalDate decisionDate, LocalTime decisionTime){
        this.decisionDate = decisionDate;
        this.decisionTime = decisionTime;
    }

    public int getRequestId() {
        return requestId;
    }

    public LocalDate getDecisionDate() {
        return decisionDate;
    }

    public LocalTime getDecisionTime() {
        return decisionTime;
    }


    public void setDecisionDate(LocalDate decisionDate) {
        this.decisionDate = decisionDate;
    }

    public void setDecisionTime(LocalTime decisionTime) {
        this.decisionTime = decisionTime;
    }
}
