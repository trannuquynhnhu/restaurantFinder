// Author: ChauKy Nguyen
// ID: 986085
// Decription: API for CRUD restaurant

var express = require("express");
var restaurantService = require("../services/restaurant.service.js");

var router = express.Router();

//get all restaurants
router.get("/", getAllRestaurants);
function getAllRestaurants(req, res) {

    restaurantService.getAllRestaurants().then(docs => {
        console.log(docs);
        res.send(docs);
    })
}


//get restaurant by ID
router.get("/:id", getRestaurantById);
function getRestaurantById(req, res) {
    restaurantService.getRestaurantById(req.params.id).then(docs => {
        res.send(docs);
    })
}

//delete restaurant by ID
router.delete("/:id", deleteRestaurantById);
function deleteRestaurantById(req, res) {
    restaurantService.deleteRestaurantById(req.params.id).then(docs => {
        res.send(docs);
    })
}

//add new a restaurant
router.post("/", addRestaurant);
function addRestaurant(req, res) {
    restaurantService.addNewRestaurant(req.body).then(docs => {
        res.send(docs);
    })
}

//update the restaurant
router.put("/:id", updateRestaurant);
function updateRestaurant(req, res) {
    restaurantService.updateRestaurantById(req.params.id, req.body).then(docs => {
        res.send(docs);
    })
}

module.exports = router;
