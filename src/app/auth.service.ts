import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL = 'http://localhost:3000/auth';
  NAME_KEY = 'name';
  TOKEN_KEY = '_token';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem(this.TOKEN_KEY)
    })
};

  constructor(private http: HttpClient, private sb: MatSnackBar, private router: Router) { }

  get name() {
    return localStorage.getItem(this.NAME_KEY);
  }

  get isAuthenticated() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  get tokenHeader() {
    return this.httpOptions;
  }

  register(user) {
    delete user.confirmPassword;
    this.http.post( this.BASE_URL + '/register', user).subscribe((res) => {
      if (!res.token){
        return;
      } else {
       this.authenticate(res);
      }
    });
  }

  login(user) {
    this.http.post(this.BASE_URL + '/login', user).subscribe((res) => {
          if(res.success === false){
          console.log(res.message);
        } else {
          this.authenticate(res);
        }
    });
  }

  logout() {
    localStorage.removeItem(this.NAME_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
  }

  authenticate(res) {
    localStorage.setItem(this.TOKEN_KEY, res.token);
    localStorage.setItem(this.NAME_KEY, res.firstName);
    this.router.navigate(['/messages']);
  }

}
