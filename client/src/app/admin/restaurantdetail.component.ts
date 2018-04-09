/**
 * Filename: c:\Users\dnam8\Desktop\project\trunk\client\src\app\admin\restaurantdetail.component.ts
 * Path: c:\Users\dnam8\Desktop\project\trunk\client
 * Created Date: Monday, February 5th 2018, 7:56:30 pm
 * Author: KyNguyen
 * 
 * Copyright (c) 2018 Your Company
 */


import { Component, OnInit, NgZone } from '@angular/core';
import {
    FormGroup,
    FormControl,
    Validators,
    FormBuilder,
    FormArray,
    ReactiveFormsModule
} from "@angular/forms";
import { Observable } from "rxjs/Rx";
import { RestaurantService } from '../_services/restaurant.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from "rxjs/Rx";
import { GeolocationService } from '../_services/geolocation.service';
import { Address } from '../_models/address';
import { Coordinates } from '../_models/coordinates';

@Component({
    selector: 'app-restaurantdetail',
    templateUrl: './restaurantdetail.component.html',
    styleUrls: ['./restaurantdetail.component.css']
})

export class RestaurantdetailComponent implements OnInit {
    myForm: FormGroup;
    private subscription: Subscription;
    private id;
    private restaurantDetail;
    private location: Coordinates;

    constructor(private formBuilder: FormBuilder, private restaurantService: RestaurantService,
        private router: Router, private route: ActivatedRoute,
        private geoService: GeolocationService, private zone: NgZone) {
        this.myForm = formBuilder.group({
            'name': new FormControl('', [Validators.required, Validators.minLength(3)]),
            'address': new FormGroup({
                'street': new FormControl('', [Validators.required, Validators.minLength(3)]),
                'city': new FormControl('', [Validators.required, Validators.minLength(3)]),
                'state': new FormControl('', [Validators.required, Validators.minLength(2)]),
                'zip': new FormControl('', [Validators.required, Validators.minLength(3)]),
            }),
            'dishes': new FormControl('', [Validators.required, Validators.minLength(3)])
        });
    };
    // Save/update restaurant detail from FORM
    save() {
        // split dish as seperated by comma and trim space 
        var dishes: String = this.myForm.value['dishes'];
        if (dishes.indexOf(",") !== -1) {
            dishes = this.myForm.value['dishes'].split(",").map(function (item) {
                return item.trim();
            });;
        }
        this.myForm.value['dishes'] = dishes;

        // update the location
        if (this.location) {
            this.myForm.value['location'] = [this.location.longitude, this.location.latitude];
        }

        if (this.id == 0) {
            this.restaurantService.addRestaurant(this.myForm.value)
                .subscribe(data => { console.log("add new restaurant"); this.router.navigate(['restaurant']) }, err => console.log(err));
        } else {
            this.restaurantService.updateRestaurant(this.id, this.myForm.value)
                .subscribe(data => { console.log("update the old restaurant"); this.router.navigate(['restaurant']) }, err => console.log(err));
        }

    }

    // Load Restaurant detail into Form
    ngOnInit() {
        this.subscription = this.route.params.subscribe((param: any) => {
            this.id = param['id'];
            var dish: String = "";
            //load the restaurant detail into form, the id !=0 meant load existed restaurant info
            if (this.id !== "0") {
                this.restaurantService.getRestaurantById(this.id).subscribe(
                    data => {
                        this.restaurantDetail = data;
                        //dishes is array and it is combine again after trim
                        dish += this.restaurantDetail.dishes;
                        err => console.log(err);
                        //set FORM value
                        this.myForm.setValue({
                            name: this.restaurantDetail.name,
                            address: {
                                street: this.restaurantDetail.address.street,
                                city: this.restaurantDetail.address.city,
                                state: this.restaurantDetail.address.state,
                                zip: this.restaurantDetail.address.zip
                            },
                            dishes: dish
                        });
                        // set Location
                        if (data.location) {     
                            this.location = new Coordinates({longitude: data.location[0], 
                                latitude: data.location[1]});   
                        }
                    });
            }
        });
    }


    //delete the restaurant by id
    delete() {
        if (this.id !== "0") {
            this.restaurantService.deleteRestaurantById(this.id).subscribe(
                data => {
                    this.router.navigate(['restaurant'])
                });
        }
    }

    //validator if add new restaurant the Delete button should not appear
    visbileDelete(): { [s: string]: boolean } {
        if (this.id == 0) return { error: true };
        return null;
    }

    // destroy subscription to release memory
    inOnDestroy() {
        this.subscription.unsubscribe();
    }

//Thien An updated location show on Google MAP
    updateLocation() {
        const address = this.myForm.value.address;
        this.geoService.getLocation(new Address(address.street, address.city,
            address.state, address.zip)).subscribe(loc => {
                this.zone.run(() => this.location = loc);
                console.log(loc);
            });
    }
}
