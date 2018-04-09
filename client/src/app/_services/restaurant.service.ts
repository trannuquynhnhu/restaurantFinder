// Author: ChauKy Nguyen
// ID: 986085
// Decription: services for CRUD restaurant

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appConfig } from '../app.config';
import { Restaurant } from '../_models/restaurant';

@Injectable()
export class RestaurantService {

    constructor(private http: HttpClient) { }

    //get all restaurants
    getAllRestaurants() {
        return this.http.get<Restaurant[]>(appConfig.apiUrl + 'restaurants');
    }

    //get the restaurant by ID
    getRestaurantById(restaurantId: string) {
        return this.http.get<Restaurant>(appConfig.apiUrl + 'restaurants/' + restaurantId);
    }

    //delete the restaurant by ID
    deleteRestaurantById(restaurantId) {
        return this.http.delete(appConfig.apiUrl + 'restaurants/' + restaurantId);
    }

    //add new restaurant
    addRestaurant(restaurant: Restaurant) {
        return this.http.post(appConfig.apiUrl + 'restaurants', restaurant);
    }

    //update restaurant
    updateRestaurant(restaurantId: string, restaurant: Restaurant) {
        return this.http.put(appConfig.apiUrl + 'restaurants/' + restaurantId, restaurant);
    }

    addReview(restaurantId: string, restaurant: Restaurant) {
        // calculate the average rating of all reviews
        if (restaurant.reviews) {
            console.log(restaurant.reviews);
            var total:number = 0;
            var count:number = 0;
            for (let item of restaurant.reviews) {
                total += item.rating *1;
                count ++;
                console.log(total);
                
            }
            restaurant.rating = Math.round(total / count);
        }
        return this.updateRestaurant(restaurantId, restaurant);
    }
}
