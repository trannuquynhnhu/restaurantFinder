import {Routes, RouterModule} from '@angular/router'
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { RestaurantsearchComponent } from './restaurantsearch/restaurantsearch.component';
import { RestaurantviewComponent } from './restaurantview/restaurantview.component';
import {RestaurantdetailComponent} from './admin/restaurantdetail.component';
import { RestaurantlistComponent } from './admin/restaurantlist.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { LogoutComponent } from './logout.component';


const MAIN_ROUTES: Routes = [
    {path:"", redirectTo:'home', pathMatch:'full'},
    {path:"login", component:LoginComponent},
    {path:"logout", component:LogoutComponent},
    // {path:"home", component:HomeComponent, canActivate: [AuthGuard]},
    {path:"home", component:RestaurantsearchComponent, canActivate: [AuthGuard]},
    {path:"register", component:UserComponent},
    {path:"restaurant/search", component: RestaurantsearchComponent, canActivate: [AuthGuard]},
    {path:"restaurant/view/:id", component: RestaurantviewComponent, canActivate: [AuthGuard]},
    {path:"user/:id", component:UserComponent, canActivate: [AuthGuard]},
    {path:"restaurant/:id", component:RestaurantdetailComponent, canActivate: [AuthGuard]},
    {path:"restaurant", component:RestaurantlistComponent, canActivate: [AuthGuard]}
]

export const mainRoutes = RouterModule.forRoot(MAIN_ROUTES);    