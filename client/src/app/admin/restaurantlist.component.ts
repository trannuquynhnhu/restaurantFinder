/**
 * Filename: c:\Users\dnam8\Desktop\project\trunk\client\src\app\admin\restaurantlist.component.ts
 * Path: c:\Users\dnam8\Desktop\project\trunk\client
 * Created Date: Monday, February 5th 2018, 7:56:30 pm
 * Author: KyNguyen
 * 
 * Copyright (c) 2018 Your Company
 */

import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../_services/restaurant.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurantlist',
  templateUrl: './restaurantlist.component.html',
  styleUrls: ['./restaurantlist.component.css']
})
export class RestaurantlistComponent implements OnInit {
  public restaurantList;

  constructor(private restaurantService: RestaurantService, private router: Router) {
  }


  ngOnInit() {
    //get all restaurants from innitial
    this.restaurantService.getAllRestaurants().subscribe(
      data => { this.restaurantList = data }, err => console.log(err));;
  }

  // route/navigate to restaurant adding screen, set id in URL as 'restaurant/0' for different from update
  navigateAdd() {
    this.router.navigate(['restaurant/0']);
  }
}
