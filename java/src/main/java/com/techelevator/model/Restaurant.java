package com.techelevator.model;

import org.springframework.data.relational.core.mapping.Table;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Set;

@Entity
public class Restaurant{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int restaurantId;

    @NotNull
    @Size(min=2 , max=50)
    String restaurantName;

    @NotNull
    @Size(min=2, max=20)
    String zipCode;

    @NotNull
    @Size(min=2 , max=250)
    String hours;

    @NotNull
    @Size(min=2 , max=20)
    String type;

    @NotNull
    @Size(min=2 , max =250)
    String address;

    @Size(max = 20)
    String phoneNumber;

    @Size(max = 500)
    String thumbnailUrl;

    @ManyToMany(mappedBy = "restaurantsByRequest")
    Set<Request> requestsByRestaurant;

    public Restaurant(){}

    public Restaurant(String restaurantName, String zipCode, String hours, String type, String address, String phoneNumber, String thumbnailUrl){
        this.restaurantName = restaurantName;
        this.zipCode = zipCode;
        this.hours = hours;
        this.type = type;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.thumbnailUrl = thumbnailUrl;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public int getRestaurantId() {
        return restaurantId;
    }

    public String getHours() {
        return hours;
    }

    public String getRestaurantName() {
        return restaurantName;
    }

    public String getThumbnailUrl() {
        return thumbnailUrl;
    }

    public String getType() {
        return type;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setHours(String hours) {
        this.hours = hours;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    public void setThumbnailUrl(String thumbnailUrl) {
        this.thumbnailUrl = thumbnailUrl;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }
}
