/**
 * File: restaurant.ts
 * File Created: 02/03/2018
 * Author: nutran
 * Description: schema for restaurant
 */
const mongoose = require("mongoose")

var restaurantSchema = new mongoose.Schema({
    id: String,
    name: String,
    address:{street:String, city:String, state:String, zip:String},
    location: [Number],
    dishes: [String],
    rating: Number,
    reviews: [{username: String, comment: String, rating: Number}],
    image: String
}, {collection: "restaurants"})

restaurantSchema.index({location: '2d'});

module.exports = mongoose.model("Restaurant", restaurantSchema);
