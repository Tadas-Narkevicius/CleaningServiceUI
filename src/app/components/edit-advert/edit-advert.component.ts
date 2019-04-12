import {Advert} from './../../models/Advert';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {HttpService} from '../../services/http/http.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-advert',
  templateUrl: './edit-advert.component.html',
  styleUrls: ['./edit-advert.component.less']
})
export class EditAdvertComponent implements OnInit {

  @Input()
  advert: Advert;

  @Output()
  advertChange: EventEmitter<Advert>;

  @Output()
  update: EventEmitter<void>;

  constructor(private http: HttpService, private router: Router) {
    this.advertChange = new EventEmitter();
    this.update = new EventEmitter();
  }

  ngOnInit() {}

  updateAdvert(): void {

    this.http.updateAdvert(this.advert).subscribe(
      () => {
        console.log('Skelbimas atnaujintas!');
        // Sunaikinti objekte esančia informaciją.
        this.advert = undefined;
        // Pakeičia advert į prieštai buvusią būklė.
        this.advertChange.emit(this.advert);
        this.update.emit();
        this.router.navigate(['/listing']);
      },
      (error: HttpErrorResponse) => {
        console.log('Klaida atnaujinant skelbimą!');
      });
  }

  goBackButton() {
    // Sunaikinti objekte esančia informaciją.
    this.advert = undefined;
    this.advertChange.emit(this.advert);
  }
}
