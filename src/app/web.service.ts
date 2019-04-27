import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})

export class WebService {

  httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
    };

  BASE_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private sb: MatSnackBar, private auth: AuthService) { }

  getMessages() {
    try {
      return this.http.get( this.BASE_URL + '/messages').toPromise().catch((error) => {
        console.error('Unable to process get messages');
        return this.sb.open('Unable to get messages', 'close', {duration: 2000});
      });
    } catch (error) {
      console.error(error);
    }
  }

  postMessages(message) {
    try {
      return this.http.post( this.BASE_URL + '/messages', message, this.httpOptions).toPromise().catch((error) => {
        console.error('Unable to process this request');
        return this.sb.open('Unable to process this request', 'close', {duration: 2000});
      });
    } catch (error) {
      console.error(error);
    }
  }

  getUser() {
    return this.http.get(this.BASE_URL + '/users/me', this.auth.tokenHeader);
  }

  saveUser(userData) {
    return this.http.post(this.BASE_URL + '/users/me', userData, this.auth.tokenHeader);
  }
}
