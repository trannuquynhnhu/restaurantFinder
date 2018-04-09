/**
 * File: search.service.js
 * File Created: 02/04/2018
 * Author: nutran
 * Description: Provides service methods (CRUD) for restaurant searching
 */
var mongoose = require("mongoose");

var Restaurant = require("../models/restaurant");

var service = {};

service.getNearRestaurants = function(currentCord){     
    return Restaurant.find({location: {$near: currentCord}}).limit(5);    
}

service.getRestaurantsWithDishesAndLocation = function(currentCord, dishes){  
    var dishArray = dishes.split(",");
    dishArray = dishArray.map(x => x.trim());

    return Restaurant.find({$and: [{location: {$near: currentCord}}, {dishes: {$in: dishArray}}]}).limit(5);    
}

module.exports = service;