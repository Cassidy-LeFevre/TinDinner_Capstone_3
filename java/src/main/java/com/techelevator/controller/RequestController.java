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


}
