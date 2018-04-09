/**
 * File: user.component.ts
 * File Created: 02/03/2018
 * Author: annguyen
 * Description: This component displays the detail of an User. It can be used for create or update an user.
 */

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";

import { UserService } from '../_services/user.service';
import { UsernameUnique } from '../_validators/usernameUnique.validator';
import { matchPassword } from '../_validators/matchpassword.validator';
import { User } from '../_models/user';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    userId: string;
    userForm: FormGroup = new FormGroup({
        _id: new FormControl(''),
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        username: new FormControl('', [Validators.required], UsernameUnique.createValidator(this.userService)),
        pwdGroup: new FormGroup({
            password: new FormControl('', Validators.required),
            confirmPassword: new FormControl('', Validators.required),
        }, matchPassword),        
        email: new FormControl('', [Validators.required, Validators.email]),
        role: new FormControl('guest', Validators.required)
    });
    subscription: Subscription;
    constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.subscription = this.activatedRoute.params.subscribe(param => {
            this.userId = param.id;
            if (this.userId && this.userId != '0') {
                this.userService.getUserById(this.userId).subscribe(user => {
                    this.userForm.setValue(user);
                });
            }
        })
        // this.userForm.valueChanges.subscribe(data => console.log(this.userForm));
    }

    onSubmit() {
        const form = this.userForm.value;
        const user = new User(form._id, form.firstName, form.lastName, form.username, 
            form.pwdGroup.password, form.email, form.role);        
        this.userService.saveUser(user).subscribe(success => {
            this.router.navigate(['login'])
        }, error => { console.log(error) });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
