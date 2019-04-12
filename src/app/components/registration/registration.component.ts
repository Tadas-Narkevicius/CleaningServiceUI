import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {HttpService} from '../../services/http/http.service';
import {User} from '../../models/User';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less']
})
export class RegistrationComponent implements OnInit {
  username = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(4)]);

  showUsernameError: boolean;
  showEmailError: boolean;
  showPasswordError: boolean;
  responseError: string;
  showCreateUser: boolean;

  constructor(private http: HttpService, private router: Router) {}

  ngOnInit() {}

  register(): void {
    // Nustatai kad nerodytu žinučių.
    this.showUsernameError = false;
    this.showEmailError = false;
    this.showPasswordError = false;
    this.showCreateUser = false;

    if (!this.username.valid) {
      this.showUsernameError = true;
    }

    if (!this.email.valid) {
      this.showEmailError = true;
    }

    if (!this.password.valid) {
      this.showPasswordError = true;
    }

    if (this.username.valid && this.password.valid && this.email.valid ) {
      console.log('REGISTRUOJAMAS USERIS!');

      const user = new User();
      user.username = this.username.value;
      user.email = this.email.value;
      user.password = this.password.value;

      this.http.registerUser(user).subscribe({
        next: () => {
          console.log('Vartotojas užregistruotas');
          this.showCreateUser = true;
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 5000);
        },
        error: (err: HttpErrorResponse) => {
          console.log('Klaida registruojant vartotoją');

          switch (err.status) {
            case 409:
              this.responseError = 'Vartotojas su tokiu el. paštu jau egzistuoja';
              break;
            default:
              this.responseError = 'Registruojant vartotoją įvyko klaida';
              break;
          }
        }
      });

    }
  }

}
