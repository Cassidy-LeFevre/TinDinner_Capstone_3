package com.techelevator.controller;

import com.techelevator.Repository.RequestRepository;
import com.techelevator.model.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
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

    @PostMapping("/send-request")
    Request save(@RequestBody Request request){
        return requestRepository.save(request);
    }


}
