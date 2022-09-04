package com.techelevator.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class Request {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    int requestId;

    @NotNull
    

}
