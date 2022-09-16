package com.techelevator.Services;

import com.techelevator.Repository.ParticipantRepository;
import com.techelevator.Repository.RequestRepository;
import com.techelevator.Repository.RestaurantRepository;
import com.techelevator.Repository.UserRepository;
import com.techelevator.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.Set;

@Service
public class RequestService{

    @Autowired
    UserRepository userRepository;

    @Autowired
    RequestRepository requestRepository;

    @Autowired
    RestaurantRepository restaurantRepository;


    @Autowired
    ParticipantRepository participantRepository;


    public Request saveRequest(RequestDTO requestDTO){
        return requestRepository.save(convertDtoToRequest(requestDTO));
    }

    public Request updateRequest(RequestDTO requestDTO){
        if(requestRepository.findByRequestId(requestDTO.getRequestId()) != null){
            return requestRepository.save(convertDtoToRequest(requestDTO));
        } else {
            return null;
        }
    }

    public Request convertDtoToRequest(RequestDTO requestDTO){

        User creator = userRepository.findByUserId(requestDTO.getUserId());

        Set<Participant> invitedParticipants = new HashSet<Participant>();

        for(String inviteeEmail : requestDTO.getInviteeEmails()){
            if(participantRepository.findByUsername(inviteeEmail) != null) {
                invitedParticipants.add(participantRepository.findByUsername(inviteeEmail));
            } else {
                Participant newParticipant = new Participant();
                newParticipant.setUsername(inviteeEmail);
                invitedParticipants.add(participantRepository.save(newParticipant));
            }
        }

        Set<Restaurant> restaurants = new HashSet<Restaurant>();

        for(int restaurantId : requestDTO.getRestaurantIds()){
            restaurants.add(restaurantRepository.findByRestaurantId(restaurantId));
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime dateTime = LocalDateTime.parse(requestDTO.getDecisionDateTime(), formatter);
        Timestamp timestamp = Timestamp.valueOf(dateTime);

        Request request;

        if(requestDTO.getRequestId() != 0){
           request = new Request(requestDTO.getRequestId(), creator, invitedParticipants, restaurants, timestamp);
        } else {
            request = new Request(creator, invitedParticipants, restaurants, timestamp);
        }
        return request;
    }

}
