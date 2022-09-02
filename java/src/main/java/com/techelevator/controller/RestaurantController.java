package com.techelevator.controller;

import com.techelevator.Repository.RestaurantRepository;
import com.techelevator.model.Restaurant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
public class RestaurantController {
    @Autowired
    RestaurantRepository restaurantRepository;

    @GetMapping("/restaurants/{zipCode}")
    List<Restaurant> findByZipCode(@Valid @PathVariable String zipCode){
        return restaurantRepository.findByZipCode(zipCode);
    }
}
