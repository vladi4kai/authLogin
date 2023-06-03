import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  registerApiUrl: string = 'https://my-training-backend.herokuapp.com/api/auth/register'
  loginApiUrl: string = 'https://my-training-backend.herokuapp.com/api/auth/login';


  registerUser(userData: object) {
    return this.http.post(this.registerApiUrl, userData);
  }
  loginUser(login: string, password: string) {
    const userData: object = { login , password };
    return this.http.post(this.loginApiUrl, userData);
  }

}
