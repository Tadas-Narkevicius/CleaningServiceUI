import {Advert} from './../../models/Advert';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpService} from '../../services/http/http.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-delete-advert',
  templateUrl: './delete-advert.component.html',
  styleUrls: ['./delete-advert.component.less']
})
export class DeleteAdvertComponent implements OnInit {

  @Input()
  advert: Advert;

  @Output()
  advertChange: EventEmitter<Advert>;

  @Output()
  elementDeleted: EventEmitter<Advert>;

  constructor(private http: HttpService, private router: Router) {
    this.advertChange = new EventEmitter();
    this.elementDeleted = new EventEmitter();
  }

  ngOnInit() {}

  deleteAdvert(): void {
    console.log(this.advert);
    this.http.deleteAdvert(this.advert).subscribe(
      () => {
        this.elementDeleted.emit(this.advert);

        // Kad neliktu atmintyje.
        this.advert = undefined;
        this.advertChange.emit(this.advert);
        console.log('Skelbimas ištrintas!');

      },
      (error: HttpErrorResponse) => {
        console.log(error);
        console.log('Klaida ištrinant skelbima!');
      });
  }

  goBackButton() {
    // Sunaikinti objekte esančia informaciją.
    this.advert = undefined;
    this.advertChange.emit(this.advert);
  }
}
