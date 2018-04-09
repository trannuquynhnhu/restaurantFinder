/**
 * File: auth.guard.ts
 * File Created: 02/03/2018
 * Author: annguyen
 * Description: Check if the user is logged in, if not redirect to Login page.
 */
import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { AuthService } from "../_services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if (this.auth.loggedIn()) {
            return true;
        } else {
            this.router.navigate(['login']);
        }
    }

}