import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {ContextService} from '../context/context.service';
import { Advert } from '../../models/Advert';
import { environment } from '../../../environments/environment';

// Siūsi duomenis serverį.
@Injectable({ providedIn: 'root'})

export class HttpService {
  // private url = 'http://127.0.0.1:5000';
  private url = environment.restUrl;

  constructor(private http: HttpClient, private context: ContextService) {}

  // Privatūs metodai, į kuriuos gali paduoti routus string pavidalu.
  // Bendrieji metodai, kurie hendlina HTTP verbus.
  private get(path: string, headers?: HttpHeaders, getParams?: any): Observable<any> {
    return this.http.get(this.url + path, {
      // priskiria headerius.
      headers: headers,
      params: getParams
    });
  }

  private post(path: string, body: any, headers?: HttpHeaders): Observable<any> {
    return this.http.post(this.url + path, body, {
      headers: headers
    });
  }

  private put(path: string, body: any, headers?: HttpHeaders): Observable<any> {
    return this.http.put(this.url + path, body, {
      headers: headers
    });
  }

  private delete(path: string, body: any, headers?: HttpHeaders): Observable<any> {
    return this.http.delete(this.url + path, { headers: headers });
  }

  // for home pages get all adverts.
  getAllUsersAdverts(): Observable<any> {
    return this.get('/advert/public');
  }

   // view page - get advert by id.
   getAdvertByAdvertId(orderId: number): Observable<any> {
    return this.get(`/advert/public/${orderId}`, undefined, orderId);
  }

  // home page - get adverts by title (sub)string
  getUsersAdvertsBySubstring(query: string): Observable<any> {
    return this.get('/advert/public', undefined, {title: query});
  }

  // Registration and login
  registerUser(user: User): Observable<any> {
    return this.post('/register', user);
  }

  loginUser(user: User): Observable<any> {
    return this.post('/login', user);
  }

  // Kreipiesi į serverį URL advert, su headeriais.
  getUserAdvert(): Observable<any> {
    const headers = this.generateAuthorizationHeaders();
    return this.get('/advert', headers);
  }

  addAdvert(advert: Advert): Observable<object> {
    const headers = this.generateAuthorizationHeaders();
    return this.post('/advert', advert, headers);
  }

  updateAdvert(advert: Advert): Observable<any> {
    const headers = this.generateAuthorizationHeaders();
    // advert yra body.
    return this.put(`/advert/${advert.id}`, advert, headers);
  }

  deleteAdvert(advert: Advert): Observable<any> {
    const headers = this.generateAuthorizationHeaders();
    return this.delete(`/advert/${advert.id}`, advert, headers);
  }

  private generateAuthorizationHeaders(): HttpHeaders {
    // objektas kuriame laikysime headrius.
    const headers = new HttpHeaders();
    // mes cia priskiriame requestui userio tokena.
    return headers.append('Authorization', `Bearer ${this.context.user.token}`);
  }

}
