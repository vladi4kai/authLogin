import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  apiurl: any = 'http://localhost:3000/user';
  GetAllRole(){
    return this.http.get('http://localhost:3000/role')
  }
  GetAll(){
    return this.http.get(this.apiurl)
  }
  GetbyCode(code: any){
    return this.http.get(this.apiurl + '/' + code);
  }
  ProceedRegister(inputdata:any){
    return this.http.post(this.apiurl, inputdata)
  }
  UpdateUser(code:any, inputdata:any){
    return this.http.put(this.apiurl + '/' + code, inputdata)
  }
  IsLoggedIn(){
    return sessionStorage.getItem('username')!=null
  }
  GetUserRole(){
    return sessionStorage.getItem('userrole')!=null?sessionStorage.getItem('userrole')?.toString(): '';
  }
}
