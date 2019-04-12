import {Advert} from './../../models/Advert';
import {Component, OnInit, Input } from '@angular/core';
import {HttpService} from '../../services/http/http.service';
import {ContextService} from '../../services/context/context.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { User } from '../../models/User';


@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.less']
})
export class ListingComponent implements OnInit {

  @Input()
  advert: Advert;

  adverts: Advert[];
  userData: User;
  activeAdvertEdit: Advert;
  activeAdvertDelete: Advert;
  index: number;

  username = this.context.userData.username;

  constructor(private http: HttpService, private context: ContextService) {}

  ngOnInit() {
    this.adverts = [];

    this.http.getUserAdvert().subscribe(
      (response: Advert[]) => {
        this.adverts = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  deleteAdvertById(advert: Advert) {
    const index = this.adverts.indexOf(advert);
    if (index !== -1) {
      this.adverts.splice(index, 1);
    }
  }

  onUpdate(): void {
    console.log('Skelbimas atnaujintas <PRANEŠIMAS IŠ LISTING>');
  }

}
