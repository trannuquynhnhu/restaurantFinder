/**
 * File: app.component.ts
 * File Created: 02/03/2018
 * Author: annguyen
 * Description: Main component of the application.
 */

import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core/';
import { select, NgRedux } from 'ng2-redux';
import { Router, NavigationStart } from '@angular/router';

import { AuthService } from './_services/auth.service';
import { appStore, IAppState, generateAlertAction } from './app.store';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    title = 'app';
    // @select(state => state.alertMsg) error$;

    error: string;
    constructor(public authService: AuthService, private router: Router) {

        // Subscribe to the store to get the alertMessage
        appStore.subscribe(() => {
            this.error = appStore.getState().alertMsg;
            console.log(this.error);
        })

        // Detect when route changed, in order to clear the alert message.
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                appStore.dispatch(generateAlertAction(""))
            }
        })
    }
}
