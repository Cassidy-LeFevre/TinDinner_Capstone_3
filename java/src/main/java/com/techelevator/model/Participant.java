package com.techelevator.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "participant")
public class Participant {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "participant_id")
    int participantId;

    @JsonBackReference
    @ManyToMany(mappedBy = "invitedParticipants")
    Set<Request> participantInvites;

    String username;

    public Participant(int participantId, String username) {
        this.participantId = participantId;
        this.username = username;
    }

    public Participant() {}


    public int getParticipantId() {
        return participantId;
    }

    public void setParticipantId(int participantId) {
        this.participantId = participantId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
