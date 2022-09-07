package com.techelevator.controller;

import com.techelevator.Repository.RestaurantRepository;
import com.techelevator.model.Restaurant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin
@RestController
public class RestaurantController {
    @Autowired
    RestaurantRepository restaurantRepository;

    @GetMapping("/restaurants/{zipCode}")
    List<Restaurant> findByZipCode(@Valid @PathVariable String zipCode){
        return restaurantRepository.findByZipCode(zipCode);
    }



    @GetMapping("/restaurants/by-city")
    List<Restaurant> findByStateCity(@RequestParam String stateCity){
        return restaurantRepository.findByStateCity(stateCity);
    }


    @GetMapping("/restaurants/by-name")
    List<Restaurant> findByRestaurantName(@RequestParam String name){
        return restaurantRepository.findByRestaurantName(name);
    }

    @GetMapping("/restaurants/by-type")
    List<Restaurant> findByType(@RequestParam String type){
        return restaurantRepository.findByType(type);
    }

}
