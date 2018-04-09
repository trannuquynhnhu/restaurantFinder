/**
 * File: search.controller.js
 * File Created: 02/04/2018
 * Author: nutran
 * Description: Controller for searching restaurant
 */

var express = require("express");
var searchService = require("../services/search.service.js");

var router = express.Router();

router.get("/:longtitude/:latitude/:dishes?", getRestaurants);

function getRestaurants(req, res){ 
    var currentCord = [Number(req.params.longtitude), Number(req.params.latitude)];  
       
    if(!req.params.dishes){        
        searchService.getNearRestaurants(currentCord).then(docs => {
            res.send(docs);        
        })
    }
    else{             
        searchService.getRestaurantsWithDishesAndLocation(currentCord, req.params.dishes).then(docs => {
            res.send(docs);        
        })
    }
    
    
}

module.exports = router;

