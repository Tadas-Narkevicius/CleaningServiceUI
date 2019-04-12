import { Component, OnInit, Input } from '@angular/core';
import {Advert} from './../../models/Advert';
import {HttpService} from '../../services/http/http.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.less'],
})

export class ViewComponent implements OnInit {

  // @Input()
  advertView: Advert;

  adverts: Advert;
  wssConnection: WebSocket;
  chatMessages: string[];

  message: string;
  advert: Advert;
  orderId: number;

  constructor(private route: ActivatedRoute, private http: HttpService) {

    this.chatMessages = [];

    this.wssConnection = new WebSocket('ws://localhost:5500');

    this.wssConnection.addEventListener('message', (message: MessageEvent) => {
      console.log('Atėjo žinutė iš serverio ' + message.data);
      console.log(message);

      // Adding message to chat messages array
      this.chatMessages.push(message.data);
    });
  }

  ngOnInit() {
    this.orderId = this.route.snapshot.params.orderId;
    this.viewAdvert();
   }

  sendMessage(): void {
    console.log('Sending message', this.message);
    this.wssConnection.send(this.message);
    this.message = '';
  }

  viewAdvert() {
    console.log('Vidus: ' + this.orderId);
    this.http.getAdvertByAdvertId(this.orderId).subscribe(
      (response: Advert) => {
        this.advertView = response[0];
        // console.log(this.advertView);
        console.log('Masyvas: ' + this.advertView);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

}
