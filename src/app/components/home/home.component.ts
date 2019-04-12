import { ViewComponent } from './../view/view.component';
import {Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Advert} from './../../models/Advert';
import {HttpService} from '../../services/http/http.service';
import {ContextService} from '../../services/context/context.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {

  // @Input()
  advertView: Advert[];

  advert: Advert;
  activeAdvert: Advert;
  adverts: Advert[];
  query: string;
  id: number;
  p = 1;
  orderId: number;

  constructor(private http: HttpService,
              private context: ContextService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.advertView = [];
    this.adverts = [];
    this.eventHandler();
  }

  eventHandler() {
    if (!this.query) {
      this.http.getAllUsersAdverts().subscribe(
        (response: Advert[]) => {
          this.adverts = response;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    } else {
      this.http.getUsersAdvertsBySubstring(this.query).subscribe(
        (response: Advert[]) => {
          this.adverts = response;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    }
  }

  setAdvert(advert: Advert): void {
    this.router.navigate([`view/${advert.id}`]);
  }

}
