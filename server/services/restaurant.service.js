// Author: ChauKy Nguyen
// ID: 986085
// Decription: funcitons integrate with DB for CRUD restaurant

var mongoose = require("mongoose");

var Restaurant = require("../models/restaurant");

var service = {};
//get all restaurants from mongodb
service.getAllRestaurants = function(){    
    return Restaurant.find({});    
}

//get restaurant by  Id from mongodb
service.getRestaurantById = function(id){    
    return Restaurant.findById(id);    
}

//add new restaurant from mongodb
service.addNewRestaurant = function(restaurant){ 
    restaurant._id = null;
    return Restaurant.create(restaurant);    
}

//delete the restaurant by query id from mongodb
service.deleteRestaurantById = function(id){ 
    return Restaurant.findByIdAndRemove(id);    
}

//update the restaurant by Id from mongodb
service.updateRestaurantById = function(id, restaurant){ 
    return Restaurant.findByIdAndUpdate(id, restaurant);    
}
module.exports = service;