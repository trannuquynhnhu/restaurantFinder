/**
 * File: app.module.ts
 * File Created: 02/03/2018
 * Author: annguyen
 * Description: Application main module
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core'

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { mainRoutes } from './app.routing';
import { UserService } from './_services/user.service';
import { RestaurantsearchComponent } from './restaurantsearch/restaurantsearch.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './_services/auth.service';
import { AuthGuard } from './_guards/auth.guard';
import { SearchService } from './_services/search.service';
import { RestaurantdetailComponent } from './admin/restaurantdetail.component';
import { RestaurantlistComponent } from './admin/restaurantlist.component';
import { RestaurantService } from './_services/restaurant.service';
import { RestaurantviewComponent } from './restaurantview/restaurantview.component';
import { appConfig } from './app.config';
import { ReviewComponent } from './review/review.component';
import { LogoutComponent } from './logout.component';
import { HasRoleDirective } from './_directives/has-role.directive';
import { GeolocationService } from './_services/geolocation.service';
import { NgRedux, NgReduxModule } from 'ng2-redux';
import { IAppState, appStore } from './app.store';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './app.interceptor';
import { RatingPipe } from './_directives/rating.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    RestaurantsearchComponent,
    LoginComponent,
    RestaurantdetailComponent,
    RestaurantlistComponent,
    RestaurantviewComponent,
    ReviewComponent,
    LogoutComponent,
    HasRoleDirective,
    RatingPipe
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, 
    mainRoutes, HttpClientModule, NgReduxModule,
    AgmCoreModule.forRoot({ apiKey: appConfig.googleAPIKey })
  ],
  providers: [UserService, AuthService, AuthGuard, SearchService,RestaurantService, GeolocationService,
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { 
    constructor(private ngRedux: NgRedux<IAppState>) {
        ngRedux.provideStore(appStore);
    }
}
