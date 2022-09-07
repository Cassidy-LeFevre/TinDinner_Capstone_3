package com.techelevator.Services;

import com.techelevator.Repository.RequestRepository;
import com.techelevator.Repository.RestaurantRepository;
import com.techelevator.Repository.UserRepository;
import com.techelevator.model.Request;
import com.techelevator.model.RequestDTO;
import com.techelevator.model.Restaurant;
import com.techelevator.model.User;
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
public class RequestService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RequestRepository requestRepository;

    @Autowired
    RestaurantRepository restaurantRepository;



    public Request saveRequest(RequestDTO requestDTO){

        User creator = userRepository.findByUserId(requestDTO.getUserId());

        Set<User> invitedUsers = new HashSet<User>();

        for(long inviteeId : requestDTO.getInviteeIds()){
            invitedUsers.add(userRepository.findByUserId(inviteeId));
        }

        Set<Restaurant> restaurants = new HashSet<Restaurant>();

        for(int restaurantId : requestDTO.getRestaurantIds()){
            restaurants.add(restaurantRepository.findByRestaurantId(restaurantId));
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime dateTime = LocalDateTime.parse(requestDTO.getDecisionDateTime(), formatter);
        Timestamp timestamp = Timestamp.valueOf(dateTime);

        Request request = new Request(creator,invitedUsers,restaurants, timestamp);

        return requestRepository.save(request);
    }



}
