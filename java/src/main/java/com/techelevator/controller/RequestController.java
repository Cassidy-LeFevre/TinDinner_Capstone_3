package com.techelevator.controller;

import com.techelevator.Repository.RequestRepository;
import com.techelevator.model.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RequestController {
    @Autowired
    RequestRepository requestRepository;

    @GetMapping("/request/{id}")
    Request findByRequestId(@PathVariable int id){
        return requestRepository.findByRequestId(id);
    }

    @GetMapping("/invites/{inviteeId}")
    List<Request> findByInviteeId(@PathVariable int inviteeId){
        return requestRepository.findByInviteeId(inviteeId);
    }
}
