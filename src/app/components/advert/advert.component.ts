import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../services/http/http.service';
import { Advert } from '../../models/Advert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advert',
  templateUrl: './advert.component.html',
  styleUrls: ['./advert.component.less']
})
export class AdvertComponent implements OnInit {
  title: FormControl;
  price: FormControl;
  address: FormControl;
  phone: FormControl;
  discription: FormControl;
  error: string;

  showTitleError: boolean;
  showPriceError: boolean;
  showAddressError: boolean;
  showPhoneError: boolean;
  showDiscriptionError: boolean;

  constructor(private http: HttpService, private router: Router) { }

  ngOnInit() {
    this.title = new FormControl('', [Validators.required, Validators.pattern('^(?:[^"\'{};])+?$')]);
    this.price = new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]);
    this.address = new FormControl('', [Validators.required, Validators.pattern('^(?:[^"\'{};])+?$')]);
    this.phone = new FormControl('', [Validators.required, Validators.pattern('/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\.0-9]*$/'), Validators.maxLength(10)]);
    // this.phone = new FormControl('', [Validators.required, Validators.maxLength(9)]);
    this.discription = new FormControl('', [Validators.required, Validators.pattern('^(?:[^"\'{};])+?$')]);
  }

  addAdvert(): void {
    this.showTitleError = false;
    this.showPriceError = false;
    this.showAddressError = false;
    this.showPhoneError = false;
    this.showDiscriptionError = false;

    if (!this.title.valid) {
      this.showTitleError = true;
    }

    if (!this.price.valid) {
      this.showPriceError = true;
    }

    if (!this.address.valid) {
      this.showAddressError = true;
    }

    if (!this.phone.valid) {
      this.showPhoneError = true;
    }

    if (!this.discription.valid) {
      this.showDiscriptionError = true;
    }

    const advert = new Advert(this.title.value, this.price.value, this.address.value, this.phone.value, this.discription.value);

    this.http.addAdvert(advert).subscribe(
      () => {
        this.router.navigate(['listing']);
      },
      () => {});
  }

}
