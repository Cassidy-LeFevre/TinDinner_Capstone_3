package com.techelevator.controller;

import com.techelevator.Repository.RequestRepository;
import com.techelevator.Services.RequestService;
import com.techelevator.model.Request;
import com.techelevator.model.RequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;

//TODO: Use security so user can only view own data, unless admin.
//TODO: Make some form of streamlined testing.
//TODO: Request and invitee do not exist---- maybe maybe not, it already returns nothing.

@CrossOrigin
@RestController
public class RequestController {
    @Autowired
    RequestRepository requestRepository;

    @Autowired
    RequestService requestService;

    @GetMapping("/request/{id}")
    Request findByRequestId(@PathVariable int id){
        return requestRepository.findByRequestId(id);
    }

    @GetMapping("/invites/{inviteeId}")
    List<Request> findByInviteeId(@PathVariable int inviteeId){
        return requestRepository.findByInviteeId(inviteeId);
    }

    @PostMapping("/send-request")//change to dateTime in UTC, let front end do conversion, SQL dateTime with timezone
    Request save(@RequestBody RequestDTO requestDTO ){
        return requestService.saveRequest(requestDTO) ;
    }

    @GetMapping("/request-by-creator/{id}")
    List<Request> findByCreatorId(@PathVariable long id){
        return requestRepository.findByCreatorId(id);
    }

    @PutMapping("/request/update")
    Request updateRequest(@RequestBody RequestDTO requestDTO){
        return requestService.updateRequest(requestDTO);
    }


}
