import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Routes, UrlTree, Router } from '@angular/router';
import { RegistrationComponent } from '../components/registration/registration.component';
import { AppComponent } from '../app.component';
import { LoginComponent } from '../components/login/login.component';
import { HomeComponent } from '../components/home/home.component';
import { ListingComponent } from '../components/listing/listing.component';
import { AdvertComponent } from '../components/advert/advert.component';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ContextService} from '../services/context/context.service';
import { ViewComponent } from '../components/view/view.component';

@Injectable()
export class CanActivateUser implements CanActivate {
  constructor(private context: ContextService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Jeigu user objektas ne tusčias, galime pasiekti routa.
    if (this.context.user) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}

// Sukonfiguruojame routes. Prie kiekvieno route nurodomo jo kelią bei komponentą, kurį atvaizduosime jame
export const routesConfig: Routes = [
  { path: '', component: HomeComponent},
  { path: 'view/:orderId', component: ViewComponent},
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'listing', component: ListingComponent, canActivate: [CanActivateUser] },
  { path: 'advert', component: AdvertComponent, canActivate: [CanActivateUser] },
  { path: '**', component: HomeComponent},
];
