/**
 * File: review.component.ts
 * File Created: 02/05/2018
 * Author: annguyen
 * Description: Show all reviews of a restaurant and allow user to add new review
 */

import { Component, OnInit, Input, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { RestaurantService } from '../_services/restaurant.service';
import { Restaurant } from '../_models/restaurant';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})

export class ReviewComponent implements OnInit {
    @Input() restaurant: Restaurant;
    reviewForm: FormGroup;
    isEditing: boolean = false;

    constructor(private fb: FormBuilder, private authService: AuthService, 
        private restaurantService: RestaurantService) { 
        this.reviewForm = fb.group({
            comment:[''],
            rating: [''],
        })
    }

    ngOnInit() {
        this.reviewForm.controls['rating'].setValue(2);

    }

//     var logID = 'log',
//   log = $('<div id="'+logID+'"></div>');
// $('body').append(log);
//   $('[type*="radio"]').change(function () {
//     var me = $(this);
//     log.html(me.attr('value'));
//   });




    addReview() {
        this.isEditing = true;
    }

    saveReview() {
        const review = this.reviewForm.value;
        console.log(review);
        review.username = this.authService.currentUser.username;
        if (this.restaurant && !this.restaurant.reviews) this.restaurant.reviews = [];
        this.restaurant.reviews.push(review);
        this.isEditing = false;
        this.restaurantService.addReview(this.restaurant._id, this.restaurant)
            .subscribe(data => console.log("Insert review: " + JSON.stringify(review)));
    }
}
