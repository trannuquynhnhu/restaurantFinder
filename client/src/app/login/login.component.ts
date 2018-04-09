/**
 * File: login.component.ts
 * File Created: 02/03/2018
 * Author: annguyen
 * Description: Login page
 */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router'

import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup = new FormGroup({
        'username': new FormControl(),
        'password': new FormControl()
    });

    constructor(public router: Router, private authService: AuthService) { }

    ngOnInit() {
    }

    login() {
        this.authService.login(this.loginForm.value);
    }
}
