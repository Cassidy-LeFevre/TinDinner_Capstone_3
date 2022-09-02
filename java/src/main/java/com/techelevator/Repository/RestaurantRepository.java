package com.techelevator.Repository;

import com.techelevator.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RestaurantRepository extends JpaRepository<Restaurant, Integer> {

    List<Restaurant> findByRestaurantName(String name);
    List<Restaurant> findByZipCode(String zipcode);
    List<Restaurant> findByType(String type);
    Restaurant findByRestaurantId(int id);

}
