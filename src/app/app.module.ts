import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListingComponent } from './components/listing/listing.component';
import { AdvertComponent } from './components/advert/advert.component';
import { HttpClientModule } from '@angular/common/http';
import { CanActivateUser, routesConfig } from './models/Routes';
import { EditAdvertComponent } from './components/edit-advert/edit-advert.component';
import { DeleteAdvertComponent } from './components/delete-advert/delete-advert.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ViewComponent } from './components/view/view.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    ListingComponent,
    AdvertComponent,
    EditAdvertComponent,
    DeleteAdvertComponent,
    ViewComponent
  ],
  imports: [
    NgxPaginationModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routesConfig),
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    // ActivatedRoute
  ],
  providers: [CanActivateUser],
  bootstrap: [AppComponent]
})
export class AppModule { }
