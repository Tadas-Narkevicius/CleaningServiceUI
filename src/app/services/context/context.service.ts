import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';

@Injectable({
  providedIn: 'root'
})
export class ContextService implements OnInit {
  userData: User;

  set user(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.userData = user;
  }

  get user() {
    return this.userData;
  }

  constructor(private router: Router) {
    // Getting user from local storage
    const userString = localStorage.getItem('user');

    if (userString) {
      this.userData = JSON.parse(userString);
    }
  }

  ngOnInit() {
  }

  logout(): void {
    // Sunaikinti objekte esančia informaciją.
    this.user = undefined;
    // Kada useris išsilogina User setina į tusčią stringą.
    localStorage.setItem('user', '');
    // Kada išsilogina useris perkeliamas į kitą puslapį.
    this.router.navigate(['/']);
  }

}
