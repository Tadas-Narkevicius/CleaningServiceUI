import { Component, OnInit } from '@angular/core';
import {ContextService} from './services/context/context.service';
import { User } from './models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'CleaningServices';

  constructor(public context: ContextService) {
  }

  ngOnInit() {
  }

}


