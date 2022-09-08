package com.techelevator.controller;

import com.techelevator.Repository.UserRepository;
import com.techelevator.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

//TODO: Write exception handling for if a user searched does not exist---- maybe maybe not, it already returns nothing.
//TODO: Use security so user can only view own data, unless admin.

@RestController
public class UserController {

    @Autowired
    UserRepository userRepository;

    @GetMapping("/user/{id}")
    User getById(@PathVariable long id){
        return userRepository.findByUserId(id);
    }

    @GetMapping("/find-user")
    User getByUsername(@RequestParam String username){
        return userRepository.findByUsername(username);
    }
}
