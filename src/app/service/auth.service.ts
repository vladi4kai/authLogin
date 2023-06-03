import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  registerApiUrl: string = 'auth/register'
  loginApiUrl: string = 'auth/login'

  constructor(private http: HttpClient) { }

  registerUser(userData: object) {
    return this.http.post(this.registerApiUrl, userData)
  }

  loginUser(login: string, password: string) {
    const userData: object = { login, password }
    return this.http.post(this.loginApiUrl, userData)
  }
}
